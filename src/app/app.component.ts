import { Component, ViewChild, ElementRef } from '@angular/core';
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
}
