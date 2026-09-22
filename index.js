const scriptURL ='https://script.google.com/macros/s/AKfycbyg184xzJCa_olTgPkvK0St63ncWMIdAfRsJVC9YCIb-tR3M_LqOXamZulSa2uRrpeU/exec';

let selectedProduct = "ساعة ذكية";
let selectedPrice = "$49.99";

document.querySelectorAll('.product-card button').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.parentElement;
    selectedProduct = card.querySelector('h3').innerText;
    selectedPrice = card.querySelector('.price').innerText;

    alert("تم اختيار " + selectedProduct + "! يرجى ملء بيانات التوصيل أسفل الصفحة لتأكيد الطلب ✨");
    document.querySelector('.checkout-section').scrollIntoView({ behavior: 'smooth' });
  });
});

document.getElementById('orderForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('fullName').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;

  const data = new FormData();
  data.append('product', selectedProduct);
  data.append('price', selectedPrice);
  data.append('name', name);
  data.append('phone', phone);
  data.append('address', address);
  data.append('date', new Date().toLocaleString());

  fetch(scriptURL, { method: 'POST', body: data })
    .then(response => {
      alert("مبروك! تم إرسال طلبك وتسجيله في Google Sheets بنجاح 🎉");
      document.getElementById('orderForm').reset();
    })
    .catch(error => alert("حدث خطأ أثناء إرسال الطلب، تأكدي من رابط Google Sheet!"));
});
