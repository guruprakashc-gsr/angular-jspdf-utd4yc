import { Component, ViewChild, ElementRef } from '@angular/core';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  name = '';

  @ViewChild('pdfTable', { static: false }) pdfTable: ElementRef;

  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function(element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 300,
      elementHandlers: specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }
  public generatePDF(): void {
    let toPDF = document.getElementById('chartarea');

    html2canvas(toPDF).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const fileUri = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      pdf.addImage(fileUri, 'PNG', 0, position, fileWidth, fileHeight);

      pdf.save('canvasgen.pdf');
    });
  }
}
