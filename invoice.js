let itemCount = 0;

function addInvoiceItem(){
    itemCount++;

    const newItemRow = `<tr id="itemRow${itemCount}">
        <td><input type="text" class="form-control" placeholder="Enter Description" required></td>
        <td><input type="number" class="form-control quantity" placeholder="Enter Qty" required></td>
        <td><input type="number" class="form-control unitPrice" placeholder="Enter Unit Price" required></td>
        <td><input type="number" class="form-control totalItem" disabled readonly></td>
        <td><button type="button" class="btn btn-danger" onclick="removeInvoiceItem(${itemCount})">Delete</button></td>
    </tr>`;
  
    $('#invoiceItems').append(newItemRow);
    updateTotalAmount();
}

function removeInvoiceItem(itemId){
    $(`#itemRow${itemId}`).remove();  
    updateTotalAmount();
}

function updateTotalAmount(){
    let totalAmount = 0;
    $("tr[id^='itemRow']").each(function(){
        const quantity = parseFloat($(this).find(".quantity").val()) || 0;
        const unitPrice = parseFloat($(this).find(".unitPrice").val()) || 0;
        const totalItemPrice = quantity * unitPrice;

        $(this).find(".totalItem").val(totalItemPrice.toFixed(2));  
        totalAmount += totalItemPrice;
    });

    $("#totalAmount").val(totalAmount.toFixed(2));
}

$(document).ready(function(){
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0,10);
    $("#invoiceDate").val(formattedDate);
});

$("#invoiceForm").submit(function (event){
    event.preventDefault();
    updateTotalAmount();
});

function printInvoice() {
    console.log('printInvoice function is being called'); // Log to check function execution

    const customerName = $("#customerName").val();
    const invoiceDate = $("#invoiceDate").val();
    const items = [];

    $("tr[id^='itemRow']").each(function () {
        const description = $(this).find("td:eq(0) input").val();
        const quantity = $(this).find("td:eq(1) input").val();
        const unitPrice = $(this).find("td:eq(2) input").val();
        const totalItemPrice = $(this).find("td:eq(3) input").val();

        items.push({
            description: description,
            quantity: quantity,
            unitPrice: unitPrice,
            totalItemPrice: totalItemPrice,
        });
    });

    const totalAmount = $("#totalAmount").val();

    // Save data to localStorage
    localStorage.setItem('customerName', customerName);
    localStorage.setItem('invoiceDate', invoiceDate);
    localStorage.setItem('invoiceItems', JSON.stringify(items));
    localStorage.setItem('totalAmount', totalAmount);

    // Open the invoice page
    window.open('invoice.html', '_blank');
}

