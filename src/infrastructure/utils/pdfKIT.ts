import PDFDocument from "pdfkit";
import { Response } from "express";

export function generateCertificate(stream: Response, name: string, course: string, date: Date) {
  const doc = new PDFDocument({
    size: 'A4',
    margin: 50,
    layout: 'portrait',
  });



  doc.pipe(stream);
  const logoPath = "src/public/ppBlue.png";

  // Adding a light blue border
  const borderWidth = 2;
  const borderPadding = 10;
  doc
    .lineWidth(borderWidth)
    .strokeColor("#ADD8E6")  // Light blue color
    .rect(
      borderPadding,
      borderPadding,
      doc.page.width - 2 * borderPadding,
      doc.page.height - 2 * borderPadding
    )
    .stroke();

  // Adding a logo
  if (logoPath) {
    doc.image(logoPath, doc.page.width / 2 - 50, 40, { width: 100 });
    doc.moveDown(2);
  }

  // Title
  doc
    .font("Helvetica-Bold")
    .fontSize(30)
    .fillColor("#000000")
    .text("Certificate of Completion", {
      align: "center",
    })
    .moveDown(1);

  // Decorative line
  doc
    .moveTo(doc.page.width / 4, doc.y)
    .lineTo((doc.page.width / 4) * 3, doc.y)
    .stroke()
    .moveDown(1);

  // Subtitle
  doc
    .font("Helvetica")
    .fontSize(20)
    .text("This is to certify that", {
      align: "center",
    })
    .moveDown(1);

  // Recipient's name
  doc
    .font("Helvetica-Bold")
    .fontSize(25)
    .fillColor("#003366")
    .text(name.toUpperCase(), {
      align: "center",
    })
    .moveDown(1);

  // Course details
  doc
    .font("Helvetica")
    .fontSize(20)
    .fillColor("#000000")
    .text("has successfully completed the", {
      align: "center",
    })
    .moveDown(1)
    .font("Helvetica-Bold")
    .fontSize(25)
    .fillColor("#003366")
    .text(course.toUpperCase(), {
      align: "center",
    })
    .moveDown(1);

  // Format the date
  const formattedDate = date.toLocaleDateString("en-US", {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Date
  doc
    .font("Helvetica")
    .fontSize(20)
    .fillColor("#000000")
    .text(`course on ${formattedDate}.`, {
      align: "center",
    })
    .moveDown(3);

  // Instructor Signature
  doc
    .fontSize(15)
    .fillColor("#000000")
    .text("______________________________", {
      align: "center",
    })
    .text("Instructor Signature", {
      align: "center",
    });

  // Footer (optional)
  

  // Finalize PDF file
  doc.end();
}
