import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";

export async function exportMultipleChartsToPdf() {
  const doc = new jsPDF("p", "px");

  const elements = document.getElementsByClassName("custom-chart");

  await createPdf({ doc, elements });

  doc.save(`charts.pdf`);
}

async function createPdf({
  doc,
  elements
}: {
  doc: jsPDF;
  elements: HTMLCollectionOf<Element>;
}) {
  const padding = 10;
  const marginTop = 20;
  let top = marginTop;

  const header = "RealAssist.AI"; // Add your header content here
  const header1 = '123 Main Street, Dover, NH 03820-4667'
  const footer = "Report Genereted on "; // Add your footer content here

  for (let i = 0; i < elements.length; i++) {
    const el = elements.item(i) as HTMLElement;
    const imgData = await htmlToImage.toPng(el);

    let elHeight = el.offsetHeight;
    let elWidth = el.offsetWidth;

    const pageWidth = doc.internal.pageSize.getWidth();

    if (elWidth > pageWidth) {
      const ratio = pageWidth / elWidth;
      elHeight = elHeight * ratio - padding * 2;
      elWidth = elWidth * ratio - padding * 2;
    }

    const pageHeight = doc.internal.pageSize.getHeight();

    if (top + elHeight > pageHeight) {
      doc.addPage();
      top = marginTop;
    }

    // Add Header
    doc.setFontSize(12);
    doc.text(header, padding, padding + 3);
    doc.text(header1, 265, padding + 3);

    // Draw Gradient Line
    const lineWidth = pageWidth - 20;
    const numRectangles = 5000; // Number of rectangles to create the gradient effect
    const gradientHeight = 2; // Height of each rectangle
    const gradientStep = lineWidth / numRectangles;
    // Draw Top Gradient Line
    for (let i = 0; i < numRectangles; i++) {
      const gradientColor = i === 0 ? [2, 0, 36] : i === numRectangles - 1 ? [2, 0, 36, 1] : [0, 138, 255, 100]; // Adjust colors based on your preference
      doc.setFillColor(gradientColor[0], gradientColor[1], gradientColor[2]);
      doc.rect(10 + i * gradientStep, padding + 8, gradientStep, gradientHeight, 'F');
    }

    // Draw Gradient Line
    const hexColor1: any = "#1463FF"; // Red color in hex (replace with your desired color)
    const rgbColor1: any = hexToRgb(hexColor1);
    doc.setTextColor(rgbColor1.r, rgbColor1.g, rgbColor1.b);
    doc.setFontSize(12); // Adjust the font size as needed
    doc.text("Crime", 10, padding + 35); // "Crime" text

    // Draw the gradient line
    const lineWidth1 = 200; // Adjust the width of the gradient line
    const numRectangles1 = 5000; // Number of rectangles to create the gradient effect
    const gradientHeight1 = 2; // Height of each rectangle
    const gradientStep1 = lineWidth1 / numRectangles1;

    for (let i = 0; i < numRectangles1; i++) {
      const gradientColor = i === 0 ? [2, 0, 36] : i === numRectangles1 - 1 ? [2, 0, 36, 1] : [0, 138, 255, 100];
      doc.setFillColor(gradientColor[0], gradientColor[1], gradientColor[2]);
      doc.rect(38, padding + 32, gradientStep1 * (i + 1) + 200, gradientHeight1, 'F');
    }

    // Use a higher DPI for better image quality
    doc.addImage(
      imgData,
      "PNG",
      padding,
      top + 40,
      elWidth,
      elHeight,
      `image${i}`,
      "FAST"
    );

    // Draw Bottom Gradient Line
    for (let i = 0; i < numRectangles; i++) {
      const gradientColor = i === 0 ? [2, 0, 36] : i === numRectangles - 1 ? [0, 212, 255] : [0, 138, 255, 100]; // Adjust colors based on your preference
      doc.setFillColor(gradientColor[0], gradientColor[1], gradientColor[2]);
      doc.rect(10 + i * gradientStep, pageHeight - 25, gradientStep, gradientHeight, 'F');
    }

    // Add Footer
    doc.setFontSize(10);
    const hexColor: any = "#1463FF"; // Red color in hex (replace with your desired color)
    const rgbColor: any = hexToRgb(hexColor);
    doc.setTextColor(rgbColor.r, rgbColor.g, rgbColor.b);
    const currentDate = new Date();
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    doc.text(footer + formattedDate, padding, pageHeight - padding);

    top += elHeight + marginTop + 40; // Add some extra spacing for the text, image, and border
  }

  function hexToRgb(hex: any) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
      : null;
  }
}