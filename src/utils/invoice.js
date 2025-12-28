import jsPDF from "jspdf";

export const generateInvoice = (order) => {
  const doc = new jsPDF();

  doc.text("PCD Invoice", 20, 20);
  doc.text(`Order ID: ${order._id}`, 20, 30);

  let y = 40;
  order.items.forEach((i) => {
    doc.text(
      `${i.medicine.name} | ${i.quantity} × ${i.rate} = ₹${
        i.quantity * i.rate
      }`,
      20,
      y
    );
    y += 10;
  });

  y += 10;
  doc.text(`Subtotal: ₹${order.subTotal}`, 20, y);
  y += 10;
  doc.text(`GST: ₹${order.gstAmount}`, 20, y);
  y += 10;
  doc.text(`Grand Total: ₹${order.grandTotal}`, 20, y);

  doc.save(`Invoice-${order._id}.pdf`);
};
