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
    let DATA = document.getElementById('chartarea');

    html2canvas(DATA).then(canvas => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('canvasgen.pdf');
    });
  }
}
