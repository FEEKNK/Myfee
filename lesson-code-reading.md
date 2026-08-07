# 📗 บทที่ 1: ฝึกอ่านโค้ดโปรแกรม (Program Code Reading)

> 🎯 **เป้าหมาย**: ฝึกอ่านโค้ดจริงจนกลับมาเข้าใจตรรกะและโครงสร้างของโปรแกรมได้อย่างมั่นใจ
> เหมาะสำหรับสาย Vibe Code ที่ใช้ AI เขียนโค้ดเป็นหลักจนลืมอ่านโค้ดด้วยตัวเอง

---

## 📋 สารบัญ (Table of Contents)

| ระดับ | หัวข้อ | เทคโนโลยี | รูปแบบ |
|---|---|---|---|
| 🟢 Lv.1 | HTML พื้นฐาน | HTML | ไฟล์เดียว |
| 🟢 Lv.2 | CSS Styling | CSS | ไฟล์เดียว |
| 🟢 Lv.3 | JavaScript พื้นฐาน | JS | ไฟล์เดียว |
| 🟡 Lv.4 | HTML + CSS ข้ามไฟล์ | HTML, CSS | ข้ามไฟล์ (2 ไฟล์) |
| 🟡 Lv.5 | HTML + CSS + JS ข้ามไฟล์ | HTML, CSS, JS | ข้ามไฟล์ (3 ไฟล์) |
| 🟡 Lv.6 | JavaScript DOM Manipulation | JS, HTML | ข้ามไฟล์ |
| 🟠 Lv.7 | JavaScript ES6+ Modules | JS (import/export) | ข้ามไฟล์ (หลายไฟล์) |
| 🟠 Lv.8 | React Component เบื้องต้น | React (JSX) | ไฟล์เดียว |
| 🟠 Lv.9 | React Multi-Component | React | ข้ามไฟล์ (หลาย Component) |
| 🔴 Lv.10 | Node.js Backend พื้นฐาน | Node.js, Express | ข้ามไฟล์ |
| 🔴 Lv.11 | Full-Stack ข้ามไฟล์ | React + Node.js + API | ข้ามไฟล์ (Frontend ↔ Backend) |
| 🔴 Lv.12 | Real-World Project | ผสมทุกอย่าง | ข้ามไฟล์ (โปรเจกต์จริง) |

---

## 🟢 ระดับเริ่มต้น (Beginner)

---

### 📖 Lv.1 — HTML พื้นฐาน (โครงสร้างหน้าเว็บ)

**สิ่งที่จะได้ฝึก**: อ่าน HTML tags, ลำดับชั้น (nesting), semantic elements

#### ตัวอย่างโจทย์ 1.1: โครงสร้างหน้า Profile

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>โปรไฟล์ของฉัน</title>
</head>
<body>
  <header>
    <nav>
      <a href="#about">เกี่ยวกับ</a>
      <a href="#skills">ทักษะ</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h1>สมชาย ใจดี</h1>
      <p>นักพัฒนาเว็บ Full-Stack</p>
      <img src="avatar.png" alt="รูปโปรไฟล์">
    </section>
    <section id="skills">
      <h2>ทักษะ</h2>
      <ul>
        <li>HTML & CSS</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>&copy; 2026 สมชาย</p>
  </footer>
</body>
</html>
```

**❓ คำถาม**: จงอธิบายว่าโค้ด HTML นี้สร้างหน้าเว็บแบบไหน? มีกี่ส่วนหลัก? แต่ละส่วนแสดงอะไร?

> **💡 คำใบ้**: ลองสังเกตแท็ก `<header>`, `<main>`, `<footer>` ดูสิครับ ว่ามันแบ่งสัดส่วนเว็บยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**โค้ดนี้เอาไว้สร้างหน้า "โปรไฟล์ส่วนตัว" ครับ โดยจะแบ่งโครงสร้างออกเป็น 3 ส่วนหลักๆ ให้ดูเป็นระเบียบ:**

1. **ส่วนหัว (`<header>` + `<nav>`)** — เป็นแถบเมนูด้านบน มีลิงก์ 2 อันคือ "เกี่ยวกับ" กับ "ทักษะ" สังเกตตรง `href="#about"` นะครับ พอกดปุ๊บมันจะเลื่อนปรื๊ดไปตรงส่วนนั้นเลย
2. **เนื้อหาหลัก (`<main>`)** — ข้างในจะแบ่งเป็น 2 ส่วนย่อย:
   - `#about` — ใส่ชื่อเราใหญ่ๆ (h1), ตามด้วยคำอธิบาย (p), และรูปโปรไฟล์ (img)
   - `#skills` — เป็นหัวข้อ "ทักษะ" (h2) แล้วก็ลิสต์ความสามารถของเราออกมา (ใช้ ul, li)
3. **ส่วนท้าย (`<footer>`)** — ปิดท้ายด้วยป้ายลิขสิทธิ์กะทัดรัดด้านล่างสุด

💡 **ทริคน่ารู้**: การใช้แท็กอย่าง `header`, `nav`, `main`, `section`, `footer` เรียกว่า Semantic HTML ครับ ข้อดีคือมันช่วยให้บอทของ Google (SEO) แล้วก็โปรแกรมอ่านหน้าจอเข้าใจเว็บเราได้ดีขึ้นมากๆ เลยล่ะ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเปลี่ยน `href="#about"` เป็น `href="https://google.com"` เวลากดปุ่มแล้วจะเป็นยังไง?
</details>

#### ตัวอย่างโจทย์ 1.2: ฟอร์มลงทะเบียน

```html
<form action="/register" method="POST">
  <div>
    <label for="email">อีเมล:</label>
    <input type="email" id="email" name="email" required placeholder="example@mail.com">
  </div>
  <div>
    <label for="password">รหัสผ่าน:</label>
    <input type="password" id="password" name="password" minlength="8" required>
  </div>
  <div>
    <label for="role">ประเภทผู้ใช้:</label>
    <select id="role" name="role">
      <option value="student">นักเรียน</option>
      <option value="teacher">ครู</option>
      <option value="admin">ผู้ดูแลระบบ</option>
    </select>
  </div>
  <button type="submit">สมัครสมาชิก</button>
</form>
```

**❓ คำถาม**: ฟอร์มนี้เก็บข้อมูลอะไรบ้าง? ส่งไปที่ไหน? ใช้วิธีอะไร? มีการ validate อะไรบ้าง?

> **💡 คำใบ้**: สังเกต `type="email"` และ `type="password"` ดูครับ มันช่วยป้องกันอะไรบ้าง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ฟอร์มสมัครสมาชิกนี้ทำอะไรบ้าง มาดูกัน!**
- **มันเก็บข้อมูล 3 อย่าง**: อีเมล (`email`), รหัสผ่าน (`password`), และประเภทผู้ใช้ (`role`)
- **ส่งข้อมูลไปที่ไหน?**: วิ่งไปที่ `/register` (ดูตรง `action` ของฟอร์ม)
- **ส่งท่าไหน?**: ส่งแบบซ่อนข้อมูล หรือที่เรียกว่า `POST` Method ปลอดภัยกว่าส่งผ่าน URL ครับ
- **ดักข้อมูล (Validation) ไว้ยังไงบ้าง?**:
  - **อีเมล**: เป็น `type="email"` (บังคับว่าต้องมี @ และโดเมนเนม) แถมแปะ `required` ไว้ว่าห้ามปล่อยว่างนะ
  - **รหัสผ่าน**: เป็น `type="password"` (พิมพ์แล้วขึ้นเป็นจุดดำๆ ดักไว้ไม่ให้คนแอบดู) + บังคับ `minlength="8"` (ต้อง 8 ตัวอักษรขึ้นไป) + ห้ามว่าง `required`
  - **ประเภทผู้ใช้**: เป็น Dropdown ให้เลือก เริ่มต้นมันจะเลือก "นักเรียน" ไว้ให้เลย อันนี้ไม่ได้ใส่ required เพราะมันมีค่าถูกเลือกไว้เสมออยู่แล้วครับ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราลบคำว่า `required` ออกจากช่องอีเมล ผู้ใช้จะกดสมัครโดยไม่กรอกอีเมลได้ไหม?
</details>

---

### 📖 Lv.2 — CSS Styling (จัดรูปแบบหน้าเว็บ)

**สิ่งที่จะได้ฝึก**: อ่าน Selectors, Properties, Box Model, Flexbox/Grid, Media Query

#### ตัวอย่างโจทย์ 2.1: Card Component

```css
/* card.css */
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.5);
}

.card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.4rem;
}

.card p {
  opacity: 0.85;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .card-container {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
}
```

**❓ คำถาม**: CSS นี้สร้าง layout แบบไหน? การ์ดมีหน้าตาอย่างไร? เมื่อ hover เกิดอะไรขึ้น? หน้าจอเล็กจะเปลี่ยนแปลงอย่างไร?

> **💡 คำใบ้**: ลองดูที่ `repeat(auto-fill, ...)` สิครับ เดาว่ามันจัดการจำนวนคอลัมน์ยังไงตอนจอเล็กลง?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**การจัด Layout (โครงร่าง):**
- คลาส `.card-container` ใช้ **CSS Grid** แบบปรับตัวได้ (Responsive) อัตโนมัติเลยฮะ 
- ตรง `repeat(auto-fill, minmax(280px, 1fr))` หมายความว่า: การ์ดแต่ละใบจะต้องกว้างอย่างน้อย 280px ถ้าหน้าจอกว้างพอ มันก็จะจับเรียงหลายๆ คอลัมน์ให้เอง แต่ถ้าจดหดลง มันก็จะลดคอลัมน์ให้แบบเนียนๆ เลย
- ห่างกันชิลๆ ด้วย `gap: 1.5rem` และมีช่องว่างรอบนอก `padding: 2rem`

**หน้าตาการ์ด:**
- ใส่สีพื้นหลังเป็น **gradient สีม่วงไล่ไปน้ำเงิน** (ไล่สีจากซ้ายบนลงขวาล่าง 135 องศา)
- มุมขอบการ์ดมนๆ ละมุนตา `border-radius: 16px`
- แอบมีเงาจางๆ สีนวลๆ `box-shadow` ให้ดูมีมิติ
- ตัวหนังสือสีขาว ตัว h3 ปรับฟอนต์ให้ใหญ่ขึ้นนิดนึง และตัว p ปรับให้ดูจางๆ ลงหน่อย (`opacity: 0.85`) จะได้ไม่แย่งซีนกัน

**เวลาเอาเมาส์ไปชี้ (Hover):**
- การ์ดจะ **ลอยขึ้นมา 8px** เด้งดึ๋งนิดๆ (`translateY(-8px)`)
- เงาด้านล่างจะเข้มและแผ่กว้างขึ้น ทำให้รู้สึกเหมือนการ์ดมันเด้งขึ้นมาจริงๆ
- จังหวะลอยจะสมูทมากเพราะเราใส่ `transition: 0.3s ease` เอาไว้ครับ

**เวลาเล่นบนหน้าจอเล็ก (มือถือ ≤768px):**
- Grid จะถูกบังคับให้เหลือ **คอลัมน์เดียว** (`1fr`) การ์ดจะเรียงต่อกันจากบนลงล่าง
- ลด Padding ขอบจอลงเหลือ `1rem` จะได้ไม่กินพื้นที่ในจอมือถือครับ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราแก้ `gap: 1.5rem` เป็น `gap: 0` การ์ดแต่ละใบจะหน้าตาเป็นยังไงตอนแสดงผล?
</details>

---

### 📖 Lv.3 — JavaScript พื้นฐาน (ตรรกะและข้อมูล)

**สิ่งที่จะได้ฝึก**: ตัวแปร, ฟังก์ชัน, Array methods, Object, เงื่อนไข, ลูป

#### ตัวอย่างโจทย์ 3.1: ระบบตะกร้าสินค้า

```javascript
// cart.js
const cart = [];

function addItem(name, price, quantity = 1) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
}

function removeItem(name) {
  const index = cart.findIndex(item => item.name === name);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

function getTotal() {
  return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartSummary() {
  return cart
    .map(item => `${item.name} x${item.quantity} = ฿${item.price * item.quantity}`)
    .join('\n');
}

// ใช้งาน
addItem('กาแฟ', 65);
addItem('ครัวซองต์', 85);
addItem('กาแฟ', 65, 2);
removeItem('ครัวซองต์');

console.log(getCartSummary());
console.log(`รวมทั้งหมด: ฿${getTotal()}`);
```

**❓ คำถาม**: โค้ดนี้ทำงานอย่างไร? สุดท้าย `console.log` จะแสดงผลอะไร? `addItem('กาแฟ', 65, 2)` ครั้งที่สองจะเกิดอะไรขึ้นในตะกร้า?

> **💡 คำใบ้**: สังเกตตอนที่เรียก `addItem("กาแฟ", 65, 2)` นะครับ โค้ดมันเช็ค `find()` ก่อนทำอะไร?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**โค้ดนี้มันทำงานแบบนี้ครับ:**
1. หยิบ **กาแฟ** ลงตะกร้า → `addItem('กาแฟ', 65)` ตอนนี้ตะกร้ามี `{ name: 'กาแฟ', price: 65, quantity: 1 }`
2. หยิบ **ครัวซองต์** ลงตะกร้า → `addItem('ครัวซองต์', 85)` ตอนนี้มี 2 อย่างละ
3. หยิบ **กาแฟ** ลงตะกร้าอีก 2 แก้ว → `addItem('กาแฟ', 65, 2)` โค้ดมันฉลาดครับ มันจะไม่สร้างบรรทัดใหม่ แต่มันจะไป `find()` เจอกาแฟที่มีอยู่แล้ว แล้วบวกจำนวนเข้าไป กลายเป็น 3 แก้ว (1+2)
4. อ้าว เปลี่ยนใจ ไม่เอา **ครัวซองต์** → `removeItem('ครัวซองต์')` หาว่าครัวซองต์อยู่บรรทัดไหนแล้วลบออกด้วย `splice` หายวับ!

**สุดท้ายที่ Console จะปริ้นท์ออกมาคือ:**
```
กาแฟ x3 = ฿195
รวมทั้งหมด: ฿195
```

**เรื่องน่ารู้ในโค้ดนี้:**
- `quantity = 1` เค้าเรียกว่า **Default Parameter** ถ้าเราไม่ส่งจำนวนมา มันจะถือว่าเราสั่ง 1 ชิ้นเสมอ
- `{ name, price, quantity }` อันนี้คือท่าเขียนย่อๆ ของ **Shorthand Property** มันมีค่าเท่ากับ `{ name: name, price: price, quantity: quantity }` ช่วยให้โค้ดสั้นลงเยอะเลย
- พระเอกของงานนี้คือ `.reduce()` เอาไว้รวบยอดค่าทั้งหมดในอาร์เรย์ให้กลายเป็นตัวเลขก้อนเดียว สะดวกสุดๆ เวลาคำนวณยอดรวม!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราไม่มี `.reduce()` การจะหาผลรวมราคาทั้งตะกร้า เราต้องเขียนลูป `for` ยังไง?
</details>

---

## 🟡 ระดับกลาง (Intermediate) — ข้ามไฟล์

---

### 📖 Lv.4 — HTML + CSS ข้ามไฟล์ (เชื่อมโยง 2 ไฟล์)

**สิ่งที่จะได้ฝึก**: การเชื่อม CSS กับ HTML, Class naming, Selector ที่ตรงกับ HTML

#### ตัวอย่างโจทย์ 4.1: หน้า Landing Page (2 ไฟล์)

**ไฟล์ที่ 1:**
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="th">
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="hero">
    <h1 class="hero__title">เรียนรู้โค้ด<span class="highlight">วันนี้</span></h1>
    <p class="hero__subtitle">เส้นทางสู่การเป็นนักพัฒนาเริ่มต้นที่นี่</p>
    <button class="btn btn--primary">เริ่มเลย</button>
    <button class="btn btn--outline">ดูรายละเอียด</button>
  </div>
</body>
</html>
```

**ไฟล์ที่ 2:**
```css
/* style.css */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #0f0f23;
  color: #e0e0e0;
}

.hero__title {
  font-size: 3rem;
  font-weight: 800;
}

.highlight {
  color: #00d4ff;
  text-decoration: underline wavy;
}

.hero__subtitle {
  font-size: 1.2rem;
  opacity: 0.7;
  margin-bottom: 2rem;
}

.btn {
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  border: 2px solid #00d4ff;
  margin: 0.5rem;
  transition: all 0.3s ease;
}

.btn--primary {
  background: #00d4ff;
  color: #0f0f23;
}

.btn--primary:hover {
  background: #00b8d9;
  transform: scale(1.05);
}

.btn--outline {
  background: transparent;
  color: #00d4ff;
}

.btn--outline:hover {
  background: #00d4ff;
  color: #0f0f23;
}
```

**❓ คำถาม**: อ่านทั้ง 2 ไฟล์แล้วอธิบาย: หน้าเว็บนี้มีหน้าตาอย่างไร? ข้อความ "วันนี้" แสดงผลต่างจากข้อความอื่นอย่างไร? ปุ่มสองปุ่มต่างกันอย่างไร? Naming convention ที่ใช้คือแบบอะไร?

> **💡 คำใบ้**: คำว่า `btn--primary` กับ `btn--outline` มันมีอะไรต่างกันในแง่ของสไตล์?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**หน้าตาเว็บเราเป็นแบบนี้ฮะ:**
- เปิดมาเจอ **Hero Section ที่กินพื้นที่เต็มจอพอดี** (min-height: 100vh) พื้นหลังสีดำเข้มๆ ดูดุดัน (#0f0f23)
- ข้อความและปุ่มทั้งหมด **จัดอยู่ตรงกลางจอเป๊ะ** ทั้งบน-ล่าง-ซ้าย-ขวา (เพราะพลังของ flexbox + align-items + justify-content)
- ตัวหนังสือใช้สีเทาอ่อน สบายตา (#e0e0e0)

**ทีเด็ดของคำว่า "วันนี้":**
- เราครอบมันด้วย `<span class="highlight">` เอาไว้ เลยทำให้**เฉพาะคำนี้** กลายเป็นสีฟ้าสดใสป๊อปขึ้นมา (#00d4ff) แถมมีเส้นใต้เป็นเส้นหยักๆ (`underline wavy`) ให้ดูสนุกขึ้นด้วย

**ปุ่ม 2 แบบที่ต่างกันชัดเจน:**
- `.btn--primary` → **ปุ่มหลักทึบแสง** พื้นสีฟ้า ตัวหนังสือดำ พอเอาเมาส์ไปชี้ปุ๊บ สีจะเข้มขึ้นและขยายขนาดเด้งขึ้นมา 5% ให้รู้ว่ากดได้นะ
- `.btn--outline` → **ปุ่มรองแบบโปร่ง** เห็นแต่กรอบสีฟ้า พอเอาเมาส์ไปชี้ปุ๊บ พื้นจะโดนเติมเต็มเป็นสีฟ้าทึบไปเลย สวยไปอีกแบบ

**ชื่อคลาสสไตล์นี้มาจากไหน?**
- เรียกว่า **BEM (Block Element Modifier)** ครับ 
  - Block คือก้อนหลัก: `.hero`, `.btn`
  - Element คือส่วนประกอบย่อย: `.hero__title`, `.hero__subtitle`
  - Modifier คือส่วนดัดแปลง: `.btn--primary`, `.btn--outline`
  ระบบนี้ช่วยให้เราตั้งชื่อคลาสไม่มั่วตอนที่เว็บมันใหญ่ขึ้นฮะ!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราไม่ใส่ `transition: 0.3s ease` ตอนที่ปุ่มขยายขนาด มันจะดูน่าเกลียดหรือสมูทขึ้น?
</details>

---

### 📖 Lv.5 — HTML + CSS + JS ข้ามไฟล์ (3 ไฟล์)

**สิ่งที่จะได้ฝึก**: Event listeners, DOM manipulation, ทำงานร่วมกัน 3 ไฟล์

#### ตัวอย่างโจทย์ 5.1: Dark Mode Toggle (3 ไฟล์)

**ไฟล์ที่ 1:**
```html
<!-- index.html -->
<body data-theme="light">
  <div class="container">
    <h1>สวัสดีโลก</h1>
    <p>กดปุ่มด้านล่างเพื่อเปลี่ยนธีม</p>
    <button id="themeToggle" class="toggle-btn">🌙 เปลี่ยนเป็น Dark Mode</button>
  </div>
  <script src="theme.js"></script>
</body>
```

**ไฟล์ที่ 2:**
```css
/* style.css */
body[data-theme="light"] {
  --bg: #ffffff;
  --text: #1a1a2e;
  --btn-bg: #1a1a2e;
  --btn-text: #ffffff;
}

body[data-theme="dark"] {
  --bg: #1a1a2e;
  --text: #e0e0e0;
  --btn-bg: #e0e0e0;
  --btn-text: #1a1a2e;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.4s ease, color 0.4s ease;
}

.toggle-btn {
  background: var(--btn-bg);
  color: var(--btn-text);
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}
```

**ไฟล์ที่ 3:**
```javascript
// theme.js
const toggleBtn = document.getElementById('themeToggle');

toggleBtn.addEventListener('click', () => {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';

  body.setAttribute('data-theme', newTheme);

  toggleBtn.textContent = newTheme === 'light'
    ? '🌙 เปลี่ยนเป็น Dark Mode'
    : '☀️ เปลี่ยนเป็น Light Mode';

  localStorage.setItem('theme', newTheme);
});

// โหลดธีมจาก localStorage ตอนเปิดหน้า
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.body.setAttribute('data-theme', savedTheme);
  toggleBtn.textContent = savedTheme === 'light'
    ? '🌙 เปลี่ยนเป็น Dark Mode'
    : '☀️ เปลี่ยนเป็น Light Mode';
}
```

**❓ คำถาม**: อธิบายว่า 3 ไฟล์นี้ทำงานร่วมกันอย่างไร? ธีมถูกเปลี่ยนด้วยกลไกอะไร? ทำไมปิดเปิดเบราว์เซอร์ใหม่ธีมยังคงเดิม?

> **💡 คำใบ้**: ฟังก์ชัน `setItem` กับ `getItem` ใน `localStorage` ทำหน้าที่ต่างกันยังไง ลองเดาดูครับ

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**3 ไฟล์นี้จับมือกันทำงานแบบนี้ครับ:**

1. **HTML (โครงร่าง)** — ประกาศตัวก่อนเลยว่า `<body data-theme="light">` (เปิดมาเป็นโหมดสว่างนะ) มีปุ่ม `#themeToggle` เอาไว้ให้กด และเรียกใช้สคริปต์ `theme.js` ตรงท้ายไฟล์
2. **CSS (สีสัน)** — เราเล่นทริคใช้ **CSS Variables (ตัวแปรสี)** ครับ:
   - ถ้าบอดี้มี `data-theme="light"` → ตัวแปรสีจะเป็นชุดโทนสว่าง
   - ถ้าบอดี้มี `data-theme="dark"` → ตัวแปรสีจะเป็นชุดโทนมืด
   - คลาสต่างๆ ในเว็บก็แค่หยิบสีจาก `var(--bg)`, `var(--text)` ไปใช้ พอบอดี้สลับโหมด สีทุกอย่างบนเว็บก็เปลี่ยนตามหมดเลย! เจ๋งปะล่ะ
3. **JS (ตัวสับสวิตช์)** — เป็นพระเอกคอยจัดการลอจิก:
   - ดักฟังการคลิกปุ่ม พอกดปุ๊บก็ดูว่าตอนนี้โหมดอะไร ถ้า light ก็สลับเป็น dark
   - จับเอา attribute `data-theme` ไปแปะใหม่ใน `<body>` (ทำให้ CSS อัปเดตสีตาม)
   - ที่สำคัญ: **แอบจดลง LocalStorage** ด้วยว่าผู้ใช้เลือกธีมอะไรไว้

**ทำไมเปิดมาใหม่ ธีมถึงยังจำได้?**
- เพราะโค้ดครึ่งล่างใน JS ไงฮะ พอเปิดหน้าเว็บมาปุ๊บ มันจะวิ่งไปควานหา `localStorage.getItem('theme')` ก่อนเลย 
- ถ้าเจอว่าเคยจำไว้ ก็จับค่านั้นยัดกลับไปที่บอดี้ทันที ธีมเลยติดหนึบไม่หายไปไหนครับ!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราปิดเบราว์เซอร์ไปแล้วเปิดใหม่ คลาสของ `<body>` จะกลับไปเป็น `light` เสมอหรือเปล่า? (ลองดูบรรทัดสุดท้าย)
</details>

---

### 📖 Lv.6 — JavaScript DOM Manipulation

**สิ่งที่จะได้ฝึก**: createElement, innerHTML, Event delegation, Dynamic rendering

#### ตัวอย่างโจทย์ 6.1: Dynamic Todo List

**ไฟล์ HTML:**
```html
<div id="app">
  <input type="text" id="taskInput" placeholder="พิมพ์งานที่ต้องทำ...">
  <button id="addBtn">เพิ่ม</button>
  <ul id="taskList"></ul>
  <p>ทั้งหมด: <span id="count">0</span> รายการ</p>
</div>
<script src="todo.js"></script>
```

**ไฟล์ JS:**
```javascript
// todo.js
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function render() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.done ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggle(${index})">${task.text}</span>
      <button onclick="remove(${index})">✕</button>
    `;
    list.appendChild(li);
  });

  document.getElementById('count').textContent = tasks.length;
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  if (!text) return;

  tasks.push({ text, done: false });
  input.value = '';
  render();
}

function toggle(index) {
  tasks[index].done = !tasks[index].done;
  render();
}

function remove(index) {
  tasks.splice(index, 1);
  render();
}

document.getElementById('addBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

render();
```

**❓ คำถาม**: ฟังก์ชัน `render()` ทำอะไร? ทำไมต้องเรียกทุกครั้งหลังเพิ่ม/ลบ/toggle? ข้อมูลหายมั้ยถ้ารีเฟรช? เหตุใดจึงใช้ `list.innerHTML = ''` ก่อน?

> **💡 คำใบ้**: เห็นคำสั่ง `list.innerHTML = ''` มั้ยครับ? คิดว่าถ้าขาดบรรทัดนี้ไป งานจะงอกแบบไหน?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ฟังก์ชัน `render()` นี่แหละเดอะแบก! มันทำ 4 อย่างรวด:**
1. **เคลียร์กระดานก่อน** (`list.innerHTML = ''`) — อันนี้สำคัญมาก ถ้าไม่ลบของเก่าทิ้ง เวลามันวาดใหม่ของมันจะงอกเบิ้ลๆๆ ซ้อนกันเรื่อยๆ แน่นอน
2. **วาดของใหม่** — มันจะวนลูปเอาลิสต์งานใน array `tasks` มาสร้างแท็ก `<li>` ใหม่ทีละอัน แล้วแปะลงไป
3. **อัปเดตตัวเลข** — เคาะจำนวนงานที่เหลืออยู่บนหน้าจอ
4. **เซฟลงเครื่อง** — ยัดข้อมูลล่าสุดลง `localStorage` เลย

**ทำไมเราต้องเรียก render() บ่อยจัง (ทุกครั้งที่ทำอะไรเลย)?**
- ท่านี้เค้าเรียกว่า **"โละทิ้งแล้ววาดใหม่ (Re-render)"** ครับ แทนที่เราจะมาคอยจำว่า "เอ๊ะ ฉันลบงานที่ 2 ไป ต้องไปหาแท็ก li ที่ 2 มาลบทิ้ง" เราใช้วิธีเปลี่ยนข้อมูลดิบ แล้วสั่งวาดใหม่ทั้งกระดานไปเลย! ง่ายกว่าเยอะและลดบั๊กได้ชัวร์ (เป็นคอนเซปต์เดียวกับที่ React ใช้เลยนะ)

**รีเฟรชแล้วข้อมูลหายป่าว?**
- ไม่หายจ้า! เพราะบรรทัดแรกสุดตอนโหลดหน้าเว็บ เราบอกให้มันไปแงะตู้ `JSON.parse(localStorage.getItem('tasks'))` เอาของเก่ากลับมาให้ด้วย

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราพิมพ์งานใหม่ลงไป แต่ลืมเรียก `render()` ตอนท้ายสุด ผู้ใช้จะเห็นงานใหม่บนจอไหม?
</details>

---

## 🟠 ระดับสูง (Advanced) — Modules, React, Node.js

---

### 📖 Lv.7 — JavaScript ES6+ Modules (import/export ข้ามไฟล์)

**สิ่งที่จะได้ฝึก**: ES Modules system, named/default export, dependency graph

#### ตัวอย่างโจทย์ 7.1: ระบบ Utils แยกโมดูล (4 ไฟล์)

**ไฟล์ 1:**
```javascript
// utils/math.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }
export const PI = 3.14159;
```

**ไฟล์ 2:**
```javascript
// utils/format.js
export function formatCurrency(amount) {
  return `฿${amount.toLocaleString()}`;
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
```

**ไฟล์ 3:**
```javascript
// services/calculator.js
import { add, multiply } from '../utils/math.js';
import { formatCurrency } from '../utils/format.js';

export default class PriceCalculator {
  constructor(taxRate = 0.07) {
    this.taxRate = taxRate;
  }

  calculate(price, quantity) {
    const subtotal = multiply(price, quantity);
    const tax = multiply(subtotal, this.taxRate);
    const total = add(subtotal, tax);

    return {
      subtotal: formatCurrency(subtotal),
      tax: formatCurrency(tax),
      total: formatCurrency(total)
    };
  }
}
```

**ไฟล์ 4:**
```javascript
// main.js
import PriceCalculator from './services/calculator.js';
import { formatDate } from './utils/format.js';

const calc = new PriceCalculator(0.07);
const result = calc.calculate(1500, 3);

console.log(`วันที่: ${formatDate('2026-08-07')}`);
console.log(`ราคาสินค้า: ${result.subtotal}`);
console.log(`ภาษี 7%: ${result.tax}`);
console.log(`รวมทั้งหมด: ${result.total}`);
```

**❓ คำถาม**: ไฟล์ทั้ง 4 เชื่อมกันอย่างไร? main.js ใช้อะไรจากไฟล์ไหนบ้าง? ผลลัพธ์ console.log สุดท้ายจะแสดงอะไร? ต่างกันอย่างไรระหว่าง `export default` กับ `export`?

> **💡 คำใบ้**: ลองสังเกต `export default` เทียบกับ `export function` ดูครับ เวลาเรียกใช้หน้าตาต่างกันมั้ย

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ภาพรวมว่ามันเรียกใช้กันยังไง (Dependency Graph):**
```text
main.js (พี่ใหญ่สุด)
  ├── services/calculator.js (คนคิดเลข)
  │     ├── utils/math.js (สูตรคำนวณ: add, multiply)
  │     └── utils/format.js (จัดรูปแบบเงิน: formatCurrency)
  └── utils/format.js (จัดรูปแบบวันที่: formatDate)
```

**ในหน้า main.js เราเรียกใช้อะไรบ้าง:**
- เรียกตัวคำนวณ `PriceCalculator` มาจาก `calculator.js`
- เรียกตัวจัดรูปแบบวันที่ `formatDate` มาจาก `format.js`
- **ข้อสังเกต:** เราไม่ได้ไปยุ่งกับ `math.js` โดยตรงเลย เพราะตัว calculator เค้าจัดการเรียกใช้ของเค้าเองหลังบ้านเรียบร้อยแล้วฮะ

**ตอนกดรัน `console.log` จะได้แบบนี้:**
```text
วันที่: 7 สิงหาคม 2569
ราคาสินค้า: ฿4,500
ภาษี 7%: ฿315
รวมทั้งหมด: ฿4,815
```
*(คำนวณแบบ 1500 x 3 = 4500 แล้วบวกภาษี 7% กลายเป็น 4815 นึกออกใช่มั้ยครับ)*

**ส่งออกแบบ Default กับ Named ต่างกันตรงไหน?**
- `export function add(...)` (แบบ Named): เวลาจะเรียกใช้ต้องเจาะจงชื่อเป๊ะๆ แล้วใส่ปีกกาครอบ เช่น `import { add } from ...`
- `export default class ...` (แบบ Default): ตัวนี้เป็นของหลักของไฟล์ เวลาเรียกใช้เราตั้งชื่อใหม่ให้มันได้เลย ไม่ต้องใส่ปีกกา เช่น `import Calc from ...` ก็ใช้ได้เหมือนกัน!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าใน `main.js` เราเผลอเขียนว่า `import { PriceCalculator } from ...` (ใส่ปีกกา) โค้ดนี้จะพังไหม ทำไม?
</details>

---

### 📖 Lv.8 — React Component เบื้องต้น (JSX)

**สิ่งที่จะได้ฝึก**: JSX syntax, useState, props, conditional rendering

#### ตัวอย่างโจทย์ 8.1: Counter with Feedback

```jsx
// Counter.jsx
import { useState } from 'react';

function Counter({ initialCount = 0, maxCount = 10 }) {
  const [count, setCount] = useState(initialCount);

  const getEmoji = () => {
    if (count === 0) return '😴';
    if (count >= maxCount) return '🎉';
    if (count > maxCount / 2) return '🔥';
    return '💪';
  };

  const percentage = Math.min((count / maxCount) * 100, 100);

  return (
    <div className="counter-card">
      <h2>{getEmoji()} นับจำนวน</h2>
      <p className="count-display">{count} / {maxCount}</p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="button-group">
        <button onClick={() => setCount(prev => Math.max(prev - 1, 0))}>
          ➖
        </button>
        <button onClick={() => setCount(0)}>รีเซ็ต</button>
        <button onClick={() => setCount(prev => Math.min(prev + 1, maxCount))}>
          ➕
        </button>
      </div>

      {count >= maxCount && (
        <p className="success-message">🏆 ถึงเป้าหมายแล้ว!</p>
      )}
    </div>
  );
}

export default Counter;
```

**❓ คำถาม**: Component นี้แสดงผลอะไร? `props` มีอะไรบ้างและใช้ default ค่าอะไร? ปุ่ม ➖ ทำไมถึงลดไม่ต่ำกว่า 0? `{count >= maxCount && (...)}` หมายความว่าอย่างไร?

> **💡 คำใบ้**: ลองดูตรง `Math.max(prev - 1, 0)` ครับ มันกำลังพยายามป้องกันเรื่องอะไรอยู่?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ภาพรวมที่ผู้ใช้จะเห็น:**
- เป็นกล่องนับเลขฮะ มีลูกเล่นตรงหัวข้อที่ Emoji จะเปลี่ยนอารมณ์ไปเรื่อยๆ (😴/💪/🔥/🎉) ยิ่งนับเยอะยิ่งไฟลุก
- ตรงกลางโชว์ตัวเลข และมีหลอดพลัง (Progress bar) วิ่งขึ้นเรื่อยๆ ตามเปอร์เซ็นต์
- ด้านล่างมีปุ่ม 3 ปุ่ม: ลดลง, รีเซ็ตเป็นศูนย์, และเพิ่มขึ้น
- พอถึงเป้าหมายเมื่อไหร่ จะมีข้อความแสดงความยินดี "🏆 ถึงเป้าหมายแล้ว!" เด้งขึ้นมา

**ของที่รับเข้ามา (Props):**
- `initialCount` (ค่าตั้งต้นให้เป็น 0)
- `maxCount` (ค่าเป้าหมายตั้งต้นให้เป็น 10)
- ท่าที่ใช้ `({ initialCount = 0 })` เค้าเรียกว่า Destructuring พร้อมใส่ Default Values ครับ ถ้าคนเรียกไม่ยอมส่งค่ามา มันก็จะใช้ค่าตั้งต้นพวกนี้นี่แหละ

**ปุ่ม ➖ ทำไมกดยังไงก็ไม่ติดลบ?**
- ความลับอยู่ที่ `Math.max(prev - 1, 0)` ครับ! พอมันลบตัวเลขไปเรื่อยๆ ถ้าติดลบปุ๊บ `Math.max` จะเทียบว่าระหว่างค่าติดลบกับ 0 อันไหนมากกว่ากัน มันก็เลยจะเด้งกลับมาเลือก 0 ให้เราเสมอ (ปุ่มบวก ➕ ก็ใช้มุกเดียวกันกับ `Math.min` กันเลขทะลุหลอดฮะ)

**แล้วไอ้ `{count >= maxCount && (<p>...</p>)}` คืออิหยัง?**
- นี่คือท่า **Conditional Rendering** สุดฮิตของ React ครับ (หรือเรียกว่า Short-circuit) แปลง่ายๆ ว่า: **ถ้าเงื่อนไขฝั่งซ้ายเป็นจริง (ถึงเป้าหมายแล้ว) ถึงจะยอมโชว์ HTML ฝั่งขวาออกมา** แต่ถ้าเงื่อนไขเป็นเท็จ มันก็แค่หายวับไป ไม่กวนใจบนหน้าจอครับ!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราลบ `{count >= maxCount && ...}` ออก แล้วใช้ CSS สั่งซ่อนแทน วิธีไหนดีกว่ากันใน React?
</details>

---

### 📖 Lv.9 — React Multi-Component ข้ามไฟล์

**สิ่งที่จะได้ฝึก**: Component composition, Props drilling, Lifting state up

#### ตัวอย่างโจทย์ 9.1: Task Manager (3 ไฟล์)

**ไฟล์ 1:**
```jsx
// components/TaskItem.jsx
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <span>{task.text}</span>
      <button onClick={() => onDelete(task.id)}>🗑️</button>
    </li>
  );
}

export default TaskItem;
```

**ไฟล์ 2:**
```jsx
// components/TaskList.jsx
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty">🎉 ไม่มีงานค้าง!</p>;
  }

  const pending = tasks.filter(t => !t.done);
  const completed = tasks.filter(t => t.done);

  return (
    <div>
      <h3>📋 รอทำ ({pending.length})</h3>
      <ul>{pending.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}</ul>

      {completed.length > 0 && (
        <>
          <h3>✅ เสร็จแล้ว ({completed.length})</h3>
          <ul>{completed.map(t => <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />)}</ul>
        </>
      )}
    </div>
  );
}

export default TaskList;
```

**ไฟล์ 3:**
```jsx
// App.jsx
import { useState } from 'react';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (!input.trim()) return;
    setTasks(prev => [...prev, { id: Date.now(), text: input, done: false }]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <h1>📝 Task Manager</h1>
      <div className="input-group">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="เพิ่มงานใหม่..." />
        <button onClick={addTask}>เพิ่ม</button>
      </div>
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}

export default App;
```

**❓ คำถาม**: State (`tasks`, `input`) อยู่ในไฟล์ไหน? ทำไมไม่เก็บไว้ใน TaskItem? ฟังก์ชัน `toggleTask` และ `deleteTask` ถูกส่งผ่านอย่างไรจนถึง TaskItem? `key={t.id}` สำคัญอย่างไร?

> **💡 คำใบ้**: ลองดูที่ `App.jsx` ว่าใครเป็นคนเก็บ State ของ `tasks` แล้วมันส่งต่อลงไปยังไง?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**State กองรวมกันอยู่ที่ไหน?**
- ไปกองอยู่ระดับบนสุดที่ `App.jsx` ครับ! ที่ทำแบบนี้เพราะทั้งช่องพิมพ์ Input และตัวแสดงผล TaskList มันต้อง "ใช้ข้อมูลร่วมกัน" เราก็เลยต้องยก State ขึ้นไปอยู่ชั้นบนสุดซะเลย ท่านี้เรียกเท่ๆ ว่า **"Lifting State Up"** 

**อ้าว แล้วทำไมไม่เอา State ไปฝากไว้ใน TaskItem ซะล่ะ?**
- ขืนเอาไปไว้ตรงนั้นมันก็จะจำได้แค่งานของใครของมันสิครับ! พ่อแม่ (App) ก็จะมองไม่เห็น ไม่รู้ว่ามีงานค้างกี่อัน แถมจะโชว์จำนวนรวมไม่ได้อีก `TaskItem` มันเลยมีหน้าที่แค่ "รับคำสั่งมาแล้วแสดงผลอย่างเดียว (Dumb Component)" ก็พอแล้ว

**การส่งไม้ผลัดของฟังก์ชัน (Props Drilling):**
```text
App.jsx (เป็นเจ้าของข้อมูลและคำสั่ง)
  └── TaskList (ทำตัวเป็นไปรษณีย์ รับ tasks, onToggle, onDelete มาแล้วส่งต่อ)
        └── TaskItem (เป็นคนเอาฟังก์ชันพวกนี้ไปผูกกับปุ่มคลิกจริงๆ)
```
- จะเห็นว่าข้อมูลและฟังก์ชันถูกโยนผ่าน Props ลงมาตั้ง 2 ทอดฮะ!

**`key={t.id}` มีไว้ทำไม สำคัญนักหรือ?**
- โคตรสำคัญฮะ! React มันฉลาดแต่ก็ต้องการตัวช่วย `key` นี่แหละเหมือนรหัสบัตรประชาชนของแต่ละบรรทัด เวลาเราลบหรือเพิ่มงาน React จะได้รู้ปุ๊บว่า "อ๋อ นายคนนี้โดนลบนะ" แล้วมันจะจัดหน้าจอใหม่เฉพาะจุดนั้นให้ทันที ไม่ต้องโหลดวาดใหม่ทั้งหมดให้เปลืองแรงครับ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราไม่ใส่ `key={t.id}` แต่ใส่เป็น `key={index}` แทน จะเกิดบั๊กอะไรตอนเราลบงานชิ้นแรกทิ้ง?
</details>

---

### 📖 Lv.10 — Node.js Backend พื้นฐาน

**สิ่งที่จะได้ฝึก**: Express routing, Middleware, REST API, req/res

#### ตัวอย่างโจทย์ 10.1: REST API Server (3 ไฟล์)

**ไฟล์ 1:**
```javascript
// middleware/auth.js
function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'ไม่มี Token กรุณาเข้าสู่ระบบ' });
  }

  if (token !== 'Bearer mysecrettoken123') {
    return res.status(403).json({ error: 'Token ไม่ถูกต้อง' });
  }

  req.user = { id: 1, name: 'สมชาย' };
  next();
}

module.exports = authMiddleware;
```

**ไฟล์ 2:**
```javascript
// routes/products.js
const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: 'กาแฟดำ', price: 65 },
  { id: 2, name: 'ชาเขียว', price: 55 },
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'ไม่พบสินค้า' });
  res.json(product);
});

router.post('/', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 1, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.delete('/:id', (req, res) => {
  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).send();
});

module.exports = router;
```

**ไฟล์ 3:**
```javascript
// server.js
const express = require('express');
const authMiddleware = require('./middleware/auth');
const productRoutes = require('./routes/products');

const app = express();
app.use(express.json());

// Public route (ไม่ต้องใช้ Token)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Protected routes (ต้องมี Token)
app.use('/api/products', authMiddleware, productRoutes);

app.listen(3000, () => {
  console.log('🚀 Server running on port 3000');
});
```

**❓ คำถาม**: ถ้ายิง `GET /api/products` โดยไม่ส่ง Header Authorization จะเกิดอะไร? ถ้ายิง `GET /api/products/99` จะได้อะไร? Middleware `authMiddleware` ทำงานตรงไหนและอย่างไร? `next()` มีบทบาทอะไร?

> **💡 คำใบ้**: สังเกต `authMiddleware` ครับ ถ้าเช็ค Token แล้วผ่าน มันเรียกคำสั่งอะไรเพื่อปล่อยให้ไปต่อ?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ถ้าแอบยิง `GET /api/products` แบบไม่พก Token มาล่ะ?**
- Request จะโดนด่านตรวจ `authMiddleware` สกัดดาวรุ่งทันทีครับ! 
- ตัวด่านตรวจจะเช็ค `req.headers['authorization']` อ้าว ไม่มีนี่นา... เลยเด้งตอบกลับเป็นสถานะ **401 (Unauthorized)** พร้อมบ่นว่า `"ไม่มี Token กรุณาเข้าสู่ระบบ"` แล้วจบทันที โดนเตะออกจากเซิร์ฟเวอร์เรียบร้อย

**แล้วถ้ายิง `GET /api/products/99` ล่ะ ได้กินกาแฟมั้ย?**
- พก Token มาถูกก็จริง ผ่านด่านตรวจไปได้ 
- แต่พอไปถึงจุดหมาย (`router.get('/:id')`) ระบบจะพยายามค้นหาเครื่องดื่มรหัส 99... ซึ่งเรามีแค่ 1 กับ 2!
- เลยโดนตอกกลับด้วยสถานะสุดฮิต **404 (Not Found)** `"ไม่พบสินค้า"` ครับผม

**Middleware ทำงานยังไง ทำไมต้องมี?**
- ลองดูบรรทัดนี้: `app.use('/api/products', authMiddleware, productRoutes)` 
- มันแปลว่า "เฮ้ย ทุกคนที่มาโซน /api/products ก่อนจะเข้าไปข้างใน ต้องแวะให้ `authMiddleware` ตรวจตัวก่อนนะ"
- ถ้าตรวจ Token แล้วผ่านฉลุย ตัว Middleware จะแอบแปะชื่อเรา `req.user = { name: 'สมชาย' }` เข้าไปด้วยนะ แล้วค่อยตะโกนว่า "ผ่านได้!" ด้วยคำสั่ง `next()`

**หน้าที่หลักของ `next()` คืออะไร?**
- มันคือคำสั่งเปิดประตูครับ! บอก Express ว่า "ตรวจเสร็จแล้ว ปล่อยให้ไปทำงานส่วนต่อไปได้เลย"
- **ระวัง!** ถ้าลืมพิมพ์ `next()` ระบบจะค้างเติ่ง (Hang) หน้าจอฝั่งคนยิง API ก็จะหมุนติ้วๆ เป็นลูกข่างจนกว่าจะ Timeout ไปเองเลยล่ะ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเอา `app.use("/api/products", authMiddleware, ...)` ไปวางไว้บรรทัดแรกสุดของไฟล์ จะเกิดอะไรกับหน้า `/api/health`?
</details>

---

## 🔴 ระดับท้าทาย (Challenge) — Full-Stack

---

### 📖 Lv.11 — Full-Stack ข้ามไฟล์ (React Frontend ↔ Node.js Backend)

**สิ่งที่จะได้ฝึก**: API Communication (fetch), async/await, Frontend-Backend separation

#### ตัวอย่างโจทย์ 11.1: User List App (Frontend + Backend)

**ไฟล์ Backend:**
```javascript
// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let users = [
  { id: 1, name: 'สมชาย', role: 'admin' },
  { id: 2, name: 'สมหญิง', role: 'user' },
];

app.get('/api/users', (req, res) => {
  const { role } = req.query;
  const filtered = role ? users.filter(u => u.role === role) : users;
  res.json(filtered);
});

app.post('/api/users', (req, res) => {
  const user = { id: Date.now(), ...req.body };
  users.push(user);
  res.status(201).json(user);
});

app.listen(4000, () => console.log('API ready on :4000'));
```

**ไฟล์ Frontend:**
```jsx
// client/src/App.jsx
import { useState, useEffect } from 'react';

const API = 'http://localhost:4000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => { setUsers(data); setLoading(false); })
      .catch(err => console.error(err));
  }, []);

  const addUser = async () => {
    if (!name.trim()) return;
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role: 'user' })
    });
    const newUser = await res.json();
    setUsers(prev => [...prev, newUser]);
    setName('');
  };

  if (loading) return <p>⏳ กำลังโหลด...</p>;

  return (
    <div>
      <h1>👥 รายชื่อผู้ใช้ ({users.length})</h1>
      <ul>
        {users.map(u => (
          <li key={u.id}>{u.name} — <span className={`badge ${u.role}`}>{u.role}</span></li>
        ))}
      </ul>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อผู้ใช้ใหม่" />
      <button onClick={addUser}>➕ เพิ่ม</button>
    </div>
  );
}

export default App;
```

**❓ คำถาม**: Frontend กับ Backend คุยกันผ่านอะไร? `useEffect` ตรงนี้ทำงานตอนไหน? ทำไม Backend ต้องใช้ `cors()`? เมื่อกดปุ่มเพิ่ม ข้อมูลถูกส่งไป-กลับอย่างไร?

> **💡 คำใบ้**: ดูตรง `useEffect(..., [])` สิครับ เครื่องหมาย `[]` มันพยายามบอกให้โหลดข้อมูลตอนไหน?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**Frontend คุยกับ Backend อีท่าไหน?**
- ใช้ไม้ตาย **HTTP REST API** ครับ ฝั่งหน้าบ้าน (Frontend) จะโยนคำสั่ง `fetch()` วิ่งไปเคาะประตูหลังบ้านที่ `http://localhost:4000/api/users` 

**`useEffect` ออกโรงตอนไหนเอ่ย?**
- สังเกตตรงตัวอาร์กิวเมนต์สุดท้ายที่มันเขียน `[]` (วงเล็บเหลี่ยมว่างๆ) ท่านี้แปลว่า "ขอทำแค่**ครั้งแรกครั้งเดียว**ตอนเปิดหน้าเว็บมานะ"
- พอมันทำงานปุ๊บ มันก็จะเรียก `fetch(API)` ไปสอยข้อมูล user จากหลังบ้าน เอามายัดใส่ state แล้วก็สั่งปิดป้าย 'กำลังโหลด...' ซะ

**อุปสรรคชีวิต ทำไมต้องใช้ `cors()` ที่ฝั่ง Backend?**
- โลกนี้มีกฎหมายที่ชื่อว่า **Same-Origin Policy** ครับ 
- Browser มันระแวงว่า เอ๊ะ หน้าบ้านพอร์ต 3000 แต่จะไปขอดึงข้อมูลบ้านคนอื่นพอร์ต 4000 ข้ามเขตกันนี่นา! บล็อกซะเลย!
- การใส่ middleware `cors()` เลยเปรียบเหมือนหลังบ้านแปะป้ายอนุญาตว่า "เข้าได้จ้า ไม่ถือสา" Browser ก็เลยยอมปล่อยให้คุยกันได้แบบชิลๆ

**เวลากดปุ่ม ➕ เพิ่ม ข้อมูลมันวิ่งไปกลับยังไง (Flow):**
1. **[หน้าบ้าน]** รวบรวมชื่อที่พิมพ์ ใส่กล่อง JSON `{"name":"สมร","role":"user"}` แล้วส่งจรวด `POST` พุ่งไปหา Backend
2. **[หลังบ้าน]** รับพัสดุมาปุ๊บ แกะกล่อง แปะป้าย ID ใหม่ด้วยเวลาปัจจุบัน `Date.now()` เก็บลงโกดัง แล้วตอบกลับไปรษณีย์พร้อมใบเสร็จรหัส **201 (Created)** แถมแนบข้อมูลคนใหม่กลับไปด้วย
3. **[หน้าบ้าน]** รับข้อมูลคนใหม่กลับมา จับยัดเข้าท้ายแถว `setUsers(prev => [...prev, newUser])` ทันใดนั้น หน้าจอ React ก็จะกระพริบวับ! วาดรายชื่อคนใหม่ให้เราดูทันที

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้า Backend ลบ `app.use(cors())` ทิ้งไป หน้าเว็บเราจะยังโหลดข้อมูล Users ได้อยู่ไหม จะมีแจ้งเตือนอะไร?
</details>

---

### 📖 Lv.12 — Real-World Project (อ่านโค้ดจากโปรเจกต์จริง)

**สิ่งที่จะได้ฝึก**: อ่านโค้ดจริงจากโปรเจกต์ MY FEE ที่เขียนเอง!

> 🎯 **แนวทาง**: ระบบจะหยิบโค้ดจากไฟล์จริงในโปรเจกต์ MY FEE (เช่น `js/core/state.js`, `js/features/finance.js`) มาให้อ่านและอธิบาย เช่น:
> - ระบบ Navigation ของ MY FEE ทำงานอย่างไร?
> - Finance tracker บันทึกและแสดงข้อมูลอย่างไร?
> - Dark Mode toggle ของจริงทำงานต่างจากตัวอย่าง Lv.5 อย่างไร?

*(โจทย์จะถูกสร้างจากโค้ดจริงในระบบ ตอนพัฒนาฟีเจอร์)*

---


---

## 🚀 เส้นทางอัปสกิล: Junior สู่ Senior (Code Evolution)

---

### 🧠 Lv.14 — Junior vs Mid-Level vs Senior (การจัดการ API & Error)

**สิ่งที่จะได้ฝึก**: การพัฒนาโค้ดจากแบบที่ "แค่ทำงานได้" ไปเป็นโค้ดที่ "ปลอดภัยและดูแลรักษาง่าย"

#### ตัวอย่างโจทย์ 14.1: ระบบดึงรายชื่อพนักงาน

**โค้ด (Junior Level):**
```javascript
function getEmployees() {
  fetch('https://api.example.com/employees')
    .then(res => res.json())
    .then(data => {
      let html = '';
      for(let i=0; i<data.length; i++) {
        html += '<li>' + data[i].name + '</li>';
      }
      document.getElementById('list').innerHTML = html;
    });
}
```

**❓ คำถาม**: โค้ด Junior ข้างต้นมีจุดอ่อนร้ายแรงอะไรบ้าง ถ้าสมมติว่าเซิร์ฟเวอร์ล่ม?

> **💡 คำใบ้**: สังเกตดูว่ามีตรงไหนที่เขียนดักจับ (Catch) สิ่งที่ผิดพลาดหรือเปล่า? แล้วการต่อ String ด้วย `+` อ่านยากไหม?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Mid-Level / Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
1. **ไม่มี Error Handling**: ถ้าเน็ตหลุด หรือ API ล่ม โค้ดจะพังเงียบๆ และผู้ใช้จะไม่รู้เลยว่าเกิดอะไรขึ้น (หน้าจอค้าง)
2. **เอาลอจิกมาปนกัน (Tight Coupling)**: โค้ดดึงข้อมูล API กับโค้ดแสดงผล HTML ถูกจับยัดรวมอยู่ในฟังก์ชันเดียวกัน 
3. **การต่อ String**: ใช้ `+` ต่อ HTML อ่านยากและเสี่ยงต่อ XSS (Cross-Site Scripting)

**โค้ดวิวัฒนาการร่าง 2 (Mid-Level):**
เขียนให้อ่านง่ายขึ้นด้วย `async/await` และมี `try-catch`
```javascript
async function getEmployees() {
  try {
    const res = await fetch('https://api.example.com/employees');
    if (!res.ok) throw new Error('Network response was not ok');
    
    const employees = await res.json();
    renderEmployees(employees); // แยกฟังก์ชันแสดงผลออกไป
  } catch (error) {
    alert('ดึงข้อมูลไม่ได้ครับ กรุณาลองใหม่');
  }
}
```

**โค้ดวิวัฒนาการร่าง 3 (Senior Level):**
แยกชั้นข้อมูล (Service Layer) ชัดเจน, แยก UI ชัดเจน, และรับมือทุกสถานการณ์
```javascript
// 1. แยกส่วนดึงข้อมูล (API Service)
class EmployeeService {
  static async fetchAll() {
    try {
      const response = await fetch('https://api.example.com/employees');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      throw error; // โยนให้ UI ไปจัดการต่อ
    }
  }
}

// 2. ส่วนควบคุมหน้าจอ (UI Controller)
async function displayEmployees() {
  const listEl = document.getElementById('list');
  const errorEl = document.getElementById('error-msg');
  
  try {
    listEl.innerHTML = '<span class="loading">กำลังโหลดข้อมูล...</span>';
    errorEl.classList.add('hidden');
    
    const employees = await EmployeeService.fetchAll();
    
    listEl.innerHTML = employees.map(emp => 
      `<li>${escapeHtml(emp.name)}</li>`
    ).join('');
    
  } catch (error) {
    listEl.innerHTML = '';
    errorEl.textContent = 'ขออภัย ไม่สามารถโหลดรายชื่อได้ในขณะนี้';
    errorEl.classList.remove('hidden');
  }
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **Separation of Concerns**: ดึงข้อมูลก็ไปอยู่ส่วนนึง (Service), จัดการหน้าจอก็อยู่อีกส่วนนึง
- **UX ที่ดีกว่า**: มีการแสดงสถานะ "กำลังโหลด..." และแยกกล่องข้อความ Error ให้ผู้ใช้อ่านรู้เรื่อง
- **ปลอดภัย**: ใช้การครอบตัวแปรเพื่อป้องกัน XSS (สมมติว่ามีฟังก์ชัน `escapeHtml`)

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราต้องดึงรายชื่อพนักงานในหน้าเว็บ 5 หน้าที่ต่างกัน โค้ดของใคร (Junior, Mid, Senior) จะเอาไปใช้ซ้ำ (Reuse) ได้ง่ายที่สุด?
</details>

---


#### ตัวอย่างโจทย์ 14.2: ระบบ Login ที่ต้องรับมือทุกสถานการณ์

**โค้ด (Junior Level):**
```javascript
function login(email, password) {
  fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    window.location.href = '/dashboard';
  });
}
```

**❓ คำถาม**: โค้ด Junior ตัวนี้มีปัญหาร้ายแรงอะไรบ้างจากมุมมอง Security และ UX?

> **💡 คำใบ้**: ดูตรง `body: JSON.stringify(...)` แล้วลองสังเกตว่ามี `headers` บอก Content-Type ให้ Server มั้ย? แล้วถ้า `data.token` เป็น `undefined` เพราะ Login ผิด จะเกิดอะไรขึ้น?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
1. **ไม่มี Content-Type Header**: Server อาจไม่เข้าใจว่า body เป็น JSON ทำให้ parse ข้อมูลไม่ได้
2. **ไม่เช็คว่า Login สำเร็จหรือเปล่า**: ถ้ารหัสผิด API ส่ง `{ error: "wrong password" }` กลับมา โค้ดก็ยังยัด `undefined` ลง localStorage แล้วเด้งไป Dashboard เฉยเลย
3. **ไม่มีข้อความบอก User**: ผู้ใช้ไม่รู้เลยว่า Login ผิดหรือถูก
4. **ไม่มี Loading State**: กดปุ่มแล้วไม่มี feedback อะไรเลย

**โค้ด Senior Level:**
```javascript
async function login(email, password) {
  const submitBtn = document.getElementById('loginBtn');
  const errorBox = document.getElementById('loginError');
  
  try {
    // 1. แสดง Loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'กำลังเข้าสู่ระบบ...';
    errorBox.classList.add('hidden');
    
    // 2. ส่งข้อมูลพร้อม Header ที่ถูกต้อง
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    
    const data = await res.json();
    
    // 3. เช็คสถานะชัดเจน
    if (!res.ok) {
      throw new Error(data.message || 'เข้าสู่ระบบไม่สำเร็จ');
    }
    
    // 4. เก็บ Token เฉพาะตอนสำเร็จ
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard';
    }
    
  } catch (error) {
    // 5. แจ้ง User ชัดเจน
    errorBox.textContent = error.message;
    errorBox.classList.remove('hidden');
  } finally {
    // 6. คืนสถานะปุ่มเสมอ ไม่ว่าจะสำเร็จหรือล้มเหลว
    submitBtn.disabled = false;
    submitBtn.textContent = 'เข้าสู่ระบบ';
  }
}
```

**ทำไมแบบนี้ถึงเป็น Senior?**
- **`finally` block**: ไม่ว่าจะสำเร็จหรือล้มเหลว ปุ่ม Login จะกลับมาสถานะปกติเสมอ (Junior มักลืมจุดนี้ ทำให้ปุ่มค้าง disabled ตลอด!)
- **Content-Type Header**: Server จะ parse JSON ได้อย่างถูกต้อง
- **UX ที่สมบูรณ์**: มี Loading → Success → Error ครบทุกสถานะ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเก็บ Token ใน `localStorage` แล้ว Hacker สามารถขโมย Token ผ่าน XSS Attack ได้ไหม? แล้วการเก็บใน `httpOnly Cookie` จะปลอดภัยกว่าหรือเปล่า?
</details>

#### ตัวอย่างโจทย์ 14.3: ดึงข้อมูลหลายแหล่งพร้อมกัน (Parallel Fetching)

**โค้ด (Junior Level):**
```javascript
async function loadDashboard() {
  const users = await fetch('/api/users').then(r => r.json());
  const orders = await fetch('/api/orders').then(r => r.json());
  const products = await fetch('/api/products').then(r => r.json());
  
  renderDashboard(users, orders, products);
}
```

**❓ คำถาม**: ถ้าแต่ละ API ใช้เวลาตอบ 1 วินาที โค้ดนี้จะใช้เวลาทั้งหมดกี่วินาที? มีวิธีไหนที่ทำให้เร็วกว่านี้ไหม?

> **💡 คำใบ้**: สังเกตว่าเราใช้ `await` แต่ละตัวรอทีละอัน มันจำเป็นต้องรอกันจริงๆ ไหม? (คำตอบ: ไม่จำเป็นเลย!)

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**คำตอบ: ใช้เวลา 3 วินาที!** (1+1+1) เพราะ `await` แต่ละตัวจะหยุดรอ API ก่อนหน้าตอบกลับมาก่อน ถึงจะยิงตัวถัดไป ทั้งๆ ที่ข้อมูล 3 ชุดนี้ไม่ได้มีอะไรเกี่ยวข้องกันเลย!

**โค้ด Senior Level:**
```javascript
async function loadDashboard() {
  try {
    // ยิง 3 API พร้อมกัน ไม่รอกัน!
    const [users, orders, products] = await Promise.all([
      fetch('/api/users').then(r => r.json()),
      fetch('/api/orders').then(r => r.json()),
      fetch('/api/products').then(r => r.json())
    ]);
    
    renderDashboard(users, orders, products);
  } catch (error) {
    // ถ้า API ตัวไหนพังตัวเดียว จะรู้ทันที
    console.error('Dashboard load failed:', error);
    showError('ไม่สามารถโหลดข้อมูลได้');
  }
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **`Promise.all`**: ยิง 3 API พร้อมกัน! ถ้าแต่ละ API ใช้เวลา 1 วินาที รวมทั้งหมดก็แค่ ~1 วินาที (เร็วกว่า 3 เท่า!)
- **Destructuring**: `const [users, orders, products]` อ่านง่ายชัดเจน
- **Error Handling**: ถ้า API ตัวใดตัวหนึ่งพัง จะจับ Error ได้ทันที

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราใช้ `Promise.all` แล้ว API ตัวที่ 2 พัง ตัวที่ 1 กับ 3 ที่สำเร็จจะยังใช้ได้ไหม? ถ้าอยากให้ได้ผลลัพธ์ที่สำเร็จมาใช้ด้วย ควรเปลี่ยนไปใช้คำสั่งอะไร? (ลองเสิร์ช `Promise.allSettled`)
</details>

---

### 🧠 Lv.15 — Junior vs Mid-Level vs Senior (อำลา Spaghetti Code)

**สิ่งที่จะได้ฝึก**: การใช้ Design Pattern และ Data Structure มาช่วยลด `if-else` ที่ซ้อนกันจนอ่านไม่ออก

#### ตัวอย่างโจทย์ 15.1: ระบบคำนวณส่วนลดของร้านกาแฟ

**โค้ด (Junior Level):**
```javascript
function getDiscount(memberType, points) {
  let discount = 0;
  if (memberType === 'SILVER') {
    if (points > 100) {
      discount = 5;
    } else {
      discount = 0;
    }
  } else if (memberType === 'GOLD') {
    if (points > 500) {
      discount = 15;
    } else if (points > 200) {
      discount = 10;
    } else {
      discount = 5;
    }
  } else if (memberType === 'PLATINUM') {
    discount = 20;
  }
  return discount;
}
```

**❓ คำถาม**: ถ้าวันหน้าการตลาดเพิ่มระดับ `DIAMOND` เข้ามา โค้ดนี้จะต้องแก้อีกกี่บรรทัด และมันมีความเสี่ยงอะไร?

> **💡 คำใบ้**: โค้ดที่เอา `if-else` มาต่อกันเรื่อยๆ พอเวลาผ่านไป 1 ปี กลับมาอ่าน จะปวดหัวไหม? 

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Mid-Level / Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
- **ความซับซ้อน (Cyclomatic Complexity)**: `if-else` ซ้อนกันลึกมาก ยิ่งเพิ่มเงื่อนไข โค้ดยิ่งยาวและตามอ่านยาก (Spaghetti Code)
- **การขยายตัว (Scalability)**: ถ้ามีเงื่อนไขโปรโมชั่นใหม่ๆ ต้องมานั่งแก้ไฟล์นี้เรื่อยๆ เสี่ยงทำพัง

**โค้ดวิวัฒนาการร่าง 2 (Mid-Level):**
ใช้ `Early Return` เพื่อลดการซ้อนของ `if`
```javascript
function getDiscount(memberType, points) {
  if (memberType === 'PLATINUM') return 20;
  
  if (memberType === 'GOLD') {
    if (points > 500) return 15;
    if (points > 200) return 10;
    return 5;
  }
  
  if (memberType === 'SILVER' && points > 100) return 5;
  
  return 0; // Default
}
```
*(อ่านง่ายขึ้นเยอะ ไม่มีย่อหน้าลึกๆ แล้ว)*

**โค้ดวิวัฒนาการร่าง 3 (Senior Level):**
ใช้ Object Dictionary (หรือ Strategy Pattern) ดึงลอจิกออกจากฟังก์ชันหลักไปเลย
```javascript
const DISCOUNT_RULES = {
  PLATINUM: () => 20,
  GOLD: (points) => {
    if (points > 500) return 15;
    if (points > 200) return 10;
    return 5;
  },
  SILVER: (points) => (points > 100 ? 5 : 0),
  DEFAULT: () => 0
};

function getDiscount(memberType, points) {
  // ดึงกฏของระดับนั้นๆ มาใช้ ถ้าไม่มีให้ใช้ DEFAULT
  const rule = DISCOUNT_RULES[memberType] || DISCOUNT_RULES.DEFAULT;
  return rule(points);
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **Open-Closed Principle (SOLID)**: ถ้าการตลาดเพิ่มตารางโปรโมชั่น `DIAMOND` เราแค่ไปเติมใส่ `DISCOUNT_RULES` โดยแทบไม่ต้องแตะฟังก์ชัน `getDiscount` เลย โค้ดหลักจึงปลอดภัย
- **อ่านเหมือนสารบัญ**: โค้ดบอกชัดเจนว่าระดับไหน ลดเท่าไหร่ ไม่ต้องไปไล่กล่องเงื่อนไขในใจ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราต้องเก็บเงื่อนไขส่วนลดไว้ใน Database ฝั่ง Backend โค้ดของ Senior จะเอื้อต่อการดึงค่าจาก Backend มาเสียบแทน มากกว่าของ Junior หรือไม่?
</details>

---


#### ตัวอย่างโจทย์ 15.2: ระบบตรวจสอบสิทธิ์ (Permission Check)

**โค้ด (Junior Level):**
```javascript
function canAccess(user, page) {
  if (user.role === 'admin') {
    return true;
  } else if (user.role === 'editor') {
    if (page === 'dashboard' || page === 'posts' || page === 'media') {
      return true;
    } else {
      return false;
    }
  } else if (user.role === 'viewer') {
    if (page === 'dashboard' || page === 'posts') {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

**❓ คำถาม**: ถ้าต้องเพิ่ม role ใหม่ชื่อ `moderator` ที่เข้าถึงได้ 4 หน้า โค้ดนี้จะต้องแก้กี่จุด? มีวิธีที่ไม่ต้องแก้ลอจิกหลักเลยไหม?

> **💡 คำใบ้**: ลองนึกถึง "ตาราง" ที่เก็บว่า role ไหนมีสิทธิ์เข้าหน้าอะไรบ้าง แทนที่จะเขียนเงื่อนไข if-else ยาวๆ

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
- ต้องเพิ่ม `else if` อีก 1 ก้อน + ใส่เงื่อนไขหน้าเว็บ = แก้โค้ดหลายจุด เสี่ยงพัง
- เงื่อนไข `if (page === 'dashboard' || page === 'posts')` ซ้ำกันในหลาย role

**โค้ด Senior Level:**
```javascript
const PERMISSIONS = {
  admin:     ['*'],  // เข้าได้ทุกหน้า
  editor:    ['dashboard', 'posts', 'media'],
  moderator: ['dashboard', 'posts', 'comments', 'reports'],
  viewer:    ['dashboard', 'posts']
};

function canAccess(user, page) {
  const allowed = PERMISSIONS[user.role] || [];
  return allowed.includes('*') || allowed.includes(page);
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- ฟังก์ชัน `canAccess` เหลือแค่ 2 บรรทัด อ่านรู้เรื่องทันที
- เพิ่ม role ใหม่? แค่เติม 1 บรรทัดใน `PERMISSIONS` ไม่ต้องแตะ `canAccess` เลย
- ข้อมูลสิทธิ์ถูกแยกออกจากลอจิก (Data vs Logic separation)

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราต้องเก็บ Permission ใน Database แทน (เพื่อให้ Admin แก้ได้ผ่านหน้าเว็บ) การออกแบบแบบ Senior จะเปลี่ยนแปลงง่ายกว่าแบบ Junior ยังไง?
</details>

#### ตัวอย่างโจทย์ 15.3: ระบบแจ้งเตือนหลายช่องทาง (Notification)

**โค้ด (Junior Level):**
```javascript
function sendNotification(type, message, userId) {
  if (type === 'email') {
    console.log('Sending email to user ' + userId + ': ' + message);
    // ... code ส่ง email
  } else if (type === 'sms') {
    console.log('Sending SMS to user ' + userId + ': ' + message);
    // ... code ส่ง SMS
  } else if (type === 'push') {
    console.log('Sending push to user ' + userId + ': ' + message);
    // ... code ส่ง push notification
  } else if (type === 'line') {
    console.log('Sending LINE to user ' + userId + ': ' + message);
    // ... code ส่ง LINE
  }
}
```

**❓ คำถาม**: ถ้าต้องเพิ่มช่องทาง Discord, Slack, Telegram อีก 3 ช่องทาง ฟังก์ชันนี้จะยาวเป็นอะไร? มีวิธีที่ดีกว่านี้ไหม?

> **💡 คำใบ้**: ลองดูว่า if-else ทุกก้อนมีโครงสร้างเหมือนกันไหม? ถ้าเหมือนกัน เราแค่เปลี่ยน "ตัวส่ง" ให้เหมาะกับช่องทาง ใช่ไหมครับ?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
- ทุกครั้งที่เพิ่มช่องทางใหม่ ฟังก์ชันนี้จะบวมขึ้นเรื่อยๆ
- ถ้ามี 10 ช่องทาง = if-else 10 ก้อน อ่านจะแทบจำไม่ได้ว่าอยู่ตรงไหน
- ถ้ามี Bug ในช่องทาง 1 ตัว ต้องไปแก้ในฟังก์ชันเดียวกันที่มีโค้ด 10 ก้อนอยู่ เสี่ยงไปโดน Bug ของช่องอื่นด้วย

**โค้ด Senior Level (Strategy Pattern):**
```javascript
// แยก "ตัวส่ง" แต่ละช่องทางเป็น Object ของตัวเอง
const notificationSenders = {
  email: (userId, message) => {
    console.log('Sending email to user ' + userId + ': ' + message);
    // ... code ส่ง email
  },
  sms: (userId, message) => {
    console.log('Sending SMS to user ' + userId + ': ' + message);
  },
  push: (userId, message) => {
    console.log('Sending push to user ' + userId + ': ' + message);
  },
  line: (userId, message) => {
    console.log('Sending LINE to user ' + userId + ': ' + message);
  }
};

function sendNotification(type, message, userId) {
  const sender = notificationSenders[type];
  if (!sender) {
    console.error('Unknown notification type: ' + type);
    return;
  }
  sender(userId, message);
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- เพิ่ม Discord? แค่เติม `discord: (userId, message) => {...}` ใน `notificationSenders` ไม่ต้องแตะฟังก์ชัน `sendNotification` เลยแม้แต่ตัวเดียว!
- แต่ละช่องทางแยกออกจากกัน จะเทสต์หรือแก้ Bug ก็ทำได้โดยไม่กระทบช่องอื่น

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากส่งแจ้งเตือนพร้อมกันหลายช่องทาง เช่น ส่งทั้ง email + LINE + push ตอนมีออเดอร์ใหม่ เราจะปรับโค้ด Senior ยังไง?
</details>

---

### 🧠 Lv.16 — Junior vs Senior (เรื่องประสิทธิภาพและความเร็ว - Big O)

**สิ่งที่จะได้ฝึก**: การมองหาคอขวด (Bottleneck) ที่ทำให้โปรแกรมทำงานช้าเมื่อข้อมูลเยอะขึ้นเป็นหมื่นๆ ชิ้น

#### ตัวอย่างโจทย์ 16.1: หาคนที่มีชื่อซ้ำกันในระบบ

**โค้ด (Junior Level):**
```javascript
function findDuplicates(userIDs, activeIDs) {
  let duplicates = [];
  
  // วนลูป userIDs 10,000 รอบ
  for(let i = 0; i < userIDs.length; i++) {
    // ในแต่ละรอบ วนหาใน activeIDs อีก 10,000 รอบ
    if (activeIDs.includes(userIDs[i])) { 
      duplicates.push(userIDs[i]);
    }
  }
  return duplicates;
}
```

**❓ คำถาม**: ถ้า `userIDs` มี 10,000 คน และ `activeIDs` มี 10,000 คน คอมพิวเตอร์ต้องวนลูปประมวลผลกี่ครั้ง?

> **💡 คำใบ้**: 10,000 x 10,000 ได้เท่าไหร่? (ฟังก์ชัน `.includes()` ทำงานเป็นลูปซ่อนอยู่นะ!)

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**โค้ดนี้คอมพิวเตอร์ต้องทำงานถึง 100,000,000 ครั้ง! (ร้อยล้านครั้ง)**
- เพราะ `.includes()` เป็นลูปแบบหนึ่ง (O(N)) 
- พอเอาลูปมาซ้อนลูปแบบนี้ (Nested Loop) จะเกิดความซับซ้อนระดับ **O(N²)** ซึ่งทำให้หน้าเว็บค้างทันทีถ้ารันข้อมูลเยอะๆ

**โค้ดวิวัฒนาการร่าง Senior Level:**
ใช้ `Set` และ `Hash Map` มาช่วยหาความเร็วแสง
```javascript
function findDuplicates(userIDs, activeIDs) {
  // แปลง Array เป็น Set (กินเวลาแค่รอบเดียว)
  const activeSet = new Set(activeIDs); 
  
  // .filter() วนลูป 1 รอบ และ .has() ของ Set ทำงานทันทีโดยไม่ต้องวนลูป!
  return userIDs.filter(id => activeSet.has(id)); 
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **O(N) Complexity**: โค้ดนี้เปลี่ยนจากการทำงาน ร้อยล้านครั้ง เหลือทำงานแค่ 20,000 ครั้ง (เร็วกว่า 5,000 เท่า!!)
- โค้ดสั้นลง อ่านง่ายด้วย `filter` 
- แสดงให้เห็นว่าคนเขียนเข้าใจเรื่อง Data Structure (`Set`) อย่างแท้จริง

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเปลี่ยน `Set` ไปใช้ Object แบบ `{ "id1": true, "id2": true }` เพื่อค้นหาข้อมูล จะทำงานได้เร็วเท่ากันหรือไม่?
</details>


#### ตัวอย่างโจทย์ 16.2: ค้นหาสินค้าจากรายการขนาดใหญ่

**โค้ด (Junior Level):**
```javascript
function searchProduct(products, searchTerm) {
  let results = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
      results.push(products[i]);
    }
  }
  return results;
}

// เรียกใช้ทุกครั้งที่ User พิมพ์ตัวอักษร
searchInput.addEventListener('keyup', function() {
  const results = searchProduct(allProducts, this.value);
  renderResults(results);
});
```

**❓ คำถาม**: ถ้า `allProducts` มี 50,000 รายการ และ User พิมพ์ "กาแฟ" (4 ตัวอักษร) ฟังก์ชัน `searchProduct` จะถูกเรียกกี่ครั้ง? แล้วแต่ละครั้งมันวนลูปกี่รอบ?

> **💡 คำใบ้**: event `keyup` จะทำงานทุกครั้งที่ปล่อยนิ้วจากปุ่มคีย์บอร์ด! ลองนับดูว่าพิมพ์ "กาแฟ" จะกด key กี่ครั้ง?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**คำตอบ: searchProduct ถูกเรียก 4 ครั้ง x วนลูป 50,000 รอบ = 200,000 รอบ!**
- พิมพ์ "ก" → ค้นหา 50,000 ชิ้น (ครั้งที่ 1)
- พิมพ์ "า" → ค้นหา 50,000 ชิ้น (ครั้งที่ 2)
- พิมพ์ "แ" → ค้นหา 50,000 ชิ้น (ครั้งที่ 3)
- พิมพ์ "ฟ" → ค้นหา 50,000 ชิ้น (ครั้งที่ 4)

แต่จริงๆ แล้ว User อาจจะอยากพิมพ์ "กาแฟเย็น" ทั้งหมดก่อนค่อยค้นหา ผลลัพธ์จากครั้งที่ 1-3 เสียเปล่า!

**โค้ด Senior Level (Debounce + Optimization):**
```javascript
// 1. Debounce: รอ User หยุดพิมพ์ 300ms ก่อนค่อยค้นหา
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// 2. ค้นหาที่ Cache ผลลัพธ์ไว้
const searchCache = {};

function searchProduct(products, searchTerm) {
  const key = searchTerm.toLowerCase();
  
  // ถ้าเคยค้นแล้ว ดึงจาก Cache เลย
  if (searchCache[key]) return searchCache[key];
  
  const results = products.filter(p => 
    p.name.toLowerCase().includes(key)
  );
  
  searchCache[key] = results; // เก็บไว้ใช้ซ้ำ
  return results;
}

// 3. เรียกใช้แบบ Debounce
searchInput.addEventListener('keyup', debounce(function() {
  const results = searchProduct(allProducts, this.value);
  renderResults(results);
}, 300));
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **Debounce**: รอ User หยุดพิมพ์ 300ms ก่อนค่อยค้น ลดจำนวนการเรียก searchProduct จาก 4 ครั้งเหลือ 1 ครั้ง!
- **Caching**: ถ้า User พิมพ์ "กาแฟ" แล้วลบออก แล้วพิมพ์ "กาแฟ" อีกรอบ จะได้ผลทันทีจาก Cache ไม่ต้องวนลูปใหม่
- **.filter + .includes**: อ่านง่ายกว่า `for` loop + `indexOf`

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้า `allProducts` มี 1 ล้านรายการ การค้นหาด้วย `.includes()` จะยังเร็วพออยู่ไหม? ลองเสิร์ชคำว่า "Trie Data Structure" ดูว่ามันช่วยค้นหาข้อความได้เร็วขนาดไหน
</details>

#### ตัวอย่างโจทย์ 16.3: การ Render รายการยาวมาก (DOM Performance)

**โค้ด (Junior Level):**
```javascript
function renderList(items) {
  const container = document.getElementById('list');
  container.innerHTML = '';
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = '<h3>' + item.name + '</h3><p>' + item.desc + '</p>';
    container.appendChild(div);
  });
}
```

**❓ คำถาม**: ถ้า `items` มี 5,000 รายการ โค้ดนี้จะยิง DOM Operation (appendChild) กี่ครั้ง? และ Browser จะ Repaint หน้าจอกี่ครั้ง?

> **💡 คำใบ้**: ทุกครั้งที่ `appendChild` ลงใน `container` ที่อยู่บนหน้าจอจริง Browser อาจต้อง Recalculate Layout + Repaint ใหม่ทุกรอบ!

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**คำตอบ: appendChild ถูกเรียก 5,000 ครั้ง! และ Browser อาจ Repaint ถึง 5,000 ครั้ง!**

เพราะ `container` มันอยู่บนหน้าเว็บจริง ทุกครั้งที่ `appendChild` มันจะบอก Browser ว่า "เฮ้ย มี Element ใหม่มาเพิ่มนะ ช่วยวาดใหม่ทีสิ!" ทำให้หน้าจอกระตุกรัวๆ

**โค้ด Senior Level (DocumentFragment + Virtual Scrolling Concept):**
```javascript
function renderList(items) {
  const container = document.getElementById('list');
  
  // 1. สร้างพื้นที่ทำงานลับ (ไม่ได้อยู่บนหน้าจอ)
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = '<h3>' + item.name + '</h3><p>' + item.desc + '</p>';
    fragment.appendChild(div);  // ใส่ลงพื้นที่ลับ (ยังไม่ Render!)
  });
  
  // 2. ยัดเข้าหน้าจอทีเดียว = Repaint 1 ครั้ง!
  container.innerHTML = '';
  container.appendChild(fragment);
}
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **DocumentFragment**: เปรียบเหมือน "กล่องมองไม่เห็น" ที่เราจัดของข้างในให้เรียบร้อยก่อน พอเสร็จแล้วค่อยเอาทั้งกล่องไปวางบนหน้าจอทีเดียว
- Browser Repaint แค่ **1 ครั้ง** แทนที่จะ 5,000 ครั้ง!
- ผลลัพธ์: หน้าเว็บไม่กระตุก ลื่นปรื๊ดเลย

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้ารายการยาว 100,000 ชิ้น แม้แต่ DocumentFragment ก็ยังช้า ลองเสิร์ชคำว่า "Virtual Scrolling" หรือ "Windowing" ดูว่ามันช่วยให้แสดงรายการยาวๆ ได้ลื่นๆ ยังไง (เช่น Library react-window)
</details>

---

## 🎮 รูปแบบ UI ในแอป (Planned Interaction Flow)

```
┌──────────────────────────────────────────────┐
│  📗 ฝึกอ่านโค้ดโปรแกรม                        │
│                                              │
│  ระดับ: 🟢 Lv.1 — HTML พื้นฐาน       [1/12]  │
│  ──────────────────────────────────          │
│  ┌──────────────────────────────────┐        │
│  │  <!-- index.html -->             │        │
│  │  <header>                        │        │
│  │    <nav>                         │        │
│  │      <a href="#about">เกี่ยวกับ</a>│       │
│  │    ...                           │        │
│  └──────────────────────────────────┘        │
│                                              │
│  ❓ โค้ดนี้ทำอะไร? อธิบายโครงสร้าง            │
│  ┌──────────────────────────────────┐        │
│  │  พิมพ์คำอธิบายของคุณที่นี่...       │        │
│  │                                  │        │
│  └──────────────────────────────────┘        │
│                                              │
│  [📝 ส่งคำตอบ]    [🔑 ดูเฉลย]    [➡️ ข้อถัดไป] │
└──────────────────────────────────────────────┘
```

### ฟีเจอร์ UI ที่วางแผนไว้:
- **Code Block** พร้อม Syntax Highlighting (แยกสีตามภาษา)
- **Tab สลับไฟล์** สำหรับโจทย์แบบข้ามไฟล์ (เช่น Tab: `index.html` | `style.css` | `theme.js`)
- **พื้นที่เขียนคำตอบ** (Textarea) ให้ผู้ใช้เขียนอธิบายโค้ด
- **ปุ่มเฉลย** (Collapsible) แสดงคำอธิบายละเอียดทีละข้อ
- **ตัวนับความคืบหน้า** แสดงว่าอยู่โจทย์ไหนจากกี่ข้อ
- **บันทึกคำตอบลง LocalStorage** เพื่อย้อนดูภายหลัง

---

## 📊 สรุปแผนจำนวนโจทย์

| ระดับ | จำนวนโจทย์ (ขั้นต่ำ) | เทคโนโลยี |
|---|---|---|
| 🟢 Beginner (Lv.1-3) | 6 ข้อ (2 ข้อ/ระดับ) | HTML, CSS, JS |
| 🟡 Intermediate (Lv.4-6) | 6 ข้อ (2 ข้อ/ระดับ) | HTML+CSS, HTML+CSS+JS ข้ามไฟล์ |
| 🟠 Advanced (Lv.7-9) | 6 ข้อ (2 ข้อ/ระดับ) | ES Modules, React |
| 🔴 Challenge (Lv.10-12) | 6 ข้อ (2 ข้อ/ระดับ) | Node.js, Full-Stack |
| **รวม** | **24 ข้อขึ้นไป** | |
