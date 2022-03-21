import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import QRCode from 'qrcode';
import { BackendService } from 'src/app/service/backend.service';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { GlobalService } from 'src/app/service/global.service';

interface Print {
  url: string,
  description: string
}

@Component({
  selector: 'app-qr-banner',
  templateUrl: './qr-banner.component.html',
  styleUrls: ['./qr-banner.component.scss'],
})
export class QrBannerComponent implements OnInit {

  // Url used in qrcode
  public url: string = undefined;
  // Description string
  public description: string = '';
  // Dynamic font size
  public fontSize: number = 25;
  // Hide / Show canvas
  public printing: boolean = false;

  public print: Print[] = [{description: this.description, url: this.url}];

  constructor(
    private db: BackendService,
    public modal: ModalController,
    public global: GlobalService,
  ) { }

  async ngOnInit() {
    // Use parse config to get qr_code image then, set url
    QRCode.toDataURL(await this.db.getParseConfig('URL_STUDENT')).then(url => {
      this.url = url;
    }).catch(err => this.global.showToast(this.db.erroValidators(err)) );
  }

  /**  
    * Generate Image canvas as PDF file.
    * @returns NULL.
  */
  public generatePDF() {
    this.printing = true;
    // Wait 10ms
    setTimeout(() => {
      var data = document.getElementById('contentToConvert');
      html2canvas(data).then(canvas => {
        // Convert canvas element to dataUrl
        const contentDataURL = canvas.toDataURL('image/png');
        // Create pdf object
        let pdf = new jsPDF('p', 'mm', 'a4');
        // Add canvas as image of pdf
        pdf.addImage(contentDataURL, 'PNG', 0, 0, 0, 0, null, 'NONE');
        // Save file 'printF.pdf'
        pdf.save('printF.pdf');
        this.printing = false;
      });
    }, 10);
  }

  /**  
    * Decreases and increases the description font according to the number of characters
    * @returns New font-size number + 'px'.
  */
  public get fontSizeAjust() { return this.fontSize - (this.description.length / 10) + 'px' }
  /**  
    * Check if description has sufficient characters or blocks if it has too much.
    * @returns Boolean validation.
  */
  public get descriptionIsValid() { return this.description.length <= 100 && this.description.length > 10 }
  

}
