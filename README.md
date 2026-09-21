# دعوة محمد وميرنا — Vercel

## الملفات
- `index.html` الصفحة
- `style.css` التصميم والحركات
- `script.js` البيانات والعد التنازلي
- `assets/envelope-opening.jpeg` شاشة الظرف الافتتاحية
- `assets/mohamed-mirna-vespa.jpeg` صورة محمد وميرنا على الـVespa

## رفع المشروع على Vercel — بالتفصيل

### الطريقة الأسهل: GitHub ثم Vercel
1. فك ضغط الملف.
2. افتح GitHub وأنشئ Repository جديد، مثل: `mohamed-mirna-wedding`.
3. ارفع **كل محتويات مجلد `wedding-invite`** إلى الـRepository، وليس مجلدًا إضافيًا داخل مجلد.
4. افتح Vercel وسجّل الدخول بحساب GitHub.
5. اختر **Add New → Project**.
6. اختر Repository `mohamed-mirna-wedding`.
7. اترك Framework Preset كما هو/Other، ولا تضف Build Command.
8. اضغط **Deploy**.
9. بعد انتهاء النشر افتح رابط `.vercel.app`.

### مهم
الصورة الافتتاحية وصورة الـVespa موجودتان داخل `assets`، لذلك لا تحتاج إلى رفعهما على موقع آخر.

### تغيير وقت الفرح أو البيانات
افتح `script.js` وعدّل القيم داخل `DATA`.
