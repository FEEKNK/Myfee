# 📘 บทที่ 2: ฝึกอ่านโค้ด SQL (SQL Reading Practice)

> 🎯 **เป้าหมาย**: ฝึกอ่าน SQL Query ตั้งแต่พื้นฐานจนถึงระดับซับซ้อน ให้กลับมาอ่านและเข้าใจ Query ที่ AI สร้างให้ได้อย่างมั่นใจ

---

## 📋 สารบัญ (Table of Contents)

| ระดับ | หัวข้อ | คำสั่งหลักที่ใช้ |
|---|---|---|
| 🟢 Lv.1 | SELECT พื้นฐาน | SELECT, WHERE, ORDER BY, LIMIT |
| 🟢 Lv.2 | Filtering & Operators | AND, OR, IN, BETWEEN, LIKE, IS NULL |
| 🟡 Lv.3 | Aggregate Functions | COUNT, SUM, AVG, MAX, MIN, GROUP BY, HAVING |
| 🟡 Lv.4 | JOIN ตาราง | INNER JOIN, LEFT JOIN, RIGHT JOIN |
| 🟡 Lv.5 | JOIN หลายตาราง | Multi-table JOIN, Self JOIN |
| 🟠 Lv.6 | Subquery | Subquery in WHERE, IN, EXISTS |
| 🟠 Lv.7 | INSERT, UPDATE, DELETE | Data Manipulation |
| 🟠 Lv.8 | CREATE TABLE & Design | DDL, Constraints, Relations |
| 🔴 Lv.9 | Window Functions | ROW_NUMBER, RANK, PARTITION BY |
| 🔴 Lv.10 | Complex Real-World Query | CTE, CASE, ผสมทุกอย่าง |

---

## 📦 ฐานข้อมูลตัวอย่าง (Sample Database)

> ทุกโจทย์จะใช้ฐานข้อมูล **"ร้านกาแฟ ☕"** เป็นตัวอย่างเดียวกันตลอดทั้งบท เพื่อให้เข้าใจความสัมพันธ์ของตารางได้ดีขึ้น

### ER Diagram (ความสัมพันธ์ของตาราง)

```
┌──────────────┐      ┌──────────────────┐      ┌──────────────┐
│  customers   │      │     orders       │      │   products   │
│──────────────│      │──────────────────│      │──────────────│
│ id (PK)      │──┐   │ id (PK)          │   ┌──│ id (PK)      │
│ name         │  └──>│ customer_id (FK) │   │  │ name         │
│ email        │      │ product_id (FK)  │<──┘  │ category     │
│ membership   │      │ quantity         │      │ price        │
│ created_at   │      │ order_date       │      │ is_available │
└──────────────┘      │ status           │      └──────────────┘
                      └──────────────────┘
                               │
                      ┌────────┴─────────┐
                      │  order_reviews   │
                      │──────────────────│
                      │ id (PK)          │
                      │ order_id (FK)    │
                      │ rating (1-5)     │
                      │ comment          │
                      │ review_date      │
                      └──────────────────┘
```

### ข้อมูลตัวอย่าง

**ตาราง `products`:**
| id | name | category | price | is_available |
|---|---|---|---|---|
| 1 | อเมริกาโน่ | กาแฟ | 65 | true |
| 2 | ลาเต้ | กาแฟ | 85 | true |
| 3 | ชาเขียว | ชา | 55 | true |
| 4 | โกโก้ | อื่นๆ | 75 | true |
| 5 | เอสเพรสโซ่ | กาแฟ | 60 | false |
| 6 | ชามะลิ | ชา | 50 | true |

**ตาราง `customers`:**
| id | name | email | membership | created_at |
|---|---|---|---|---|
| 1 | สมชาย | somchai@mail.com | gold | 2025-01-15 |
| 2 | สมหญิง | somying@mail.com | silver | 2025-03-20 |
| 3 | สมศักดิ์ | somsak@mail.com | gold | 2024-11-01 |
| 4 | สมศรี | somsri@mail.com | bronze | 2026-06-10 |
| 5 | สมปอง | sompong@mail.com | silver | 2025-08-22 |

**ตาราง `orders`:**
| id | customer_id | product_id | quantity | order_date | status |
|---|---|---|---|---|---|
| 1 | 1 | 1 | 2 | 2026-08-01 | completed |
| 2 | 1 | 2 | 1 | 2026-08-01 | completed |
| 3 | 2 | 3 | 3 | 2026-08-02 | completed |
| 4 | 3 | 1 | 1 | 2026-08-03 | pending |
| 5 | 4 | 4 | 2 | 2026-08-03 | completed |
| 6 | 1 | 6 | 1 | 2026-08-04 | cancelled |
| 7 | 5 | 2 | 2 | 2026-08-05 | completed |
| 8 | 2 | 1 | 1 | 2026-08-05 | completed |
| 9 | 3 | 3 | 1 | 2026-08-06 | pending |
| 10 | 1 | 4 | 1 | 2026-08-07 | completed |

**ตาราง `order_reviews`:**
| id | order_id | rating | comment | review_date |
|---|---|---|---|---|
| 1 | 1 | 5 | อร่อยมาก! | 2026-08-01 |
| 2 | 3 | 4 | ชาเขียวหอมดี | 2026-08-02 |
| 3 | 5 | 3 | โกโก้เข้มไปหน่อย | 2026-08-03 |
| 4 | 7 | 5 | ลาเต้นุ่มมาก | 2026-08-05 |
| 5 | 10 | 4 | โกโก้วันนี้อร่อย | 2026-08-07 |

---

## 🟢 ระดับเริ่มต้น (Beginner)

---

### 📖 Lv.1 — SELECT พื้นฐาน

**สิ่งที่จะได้ฝึก**: SELECT, WHERE, ORDER BY, LIMIT, alias

#### โจทย์ 1.1: ดึงข้อมูลสินค้า

```sql
SELECT name, price
FROM products
WHERE is_available = true
ORDER BY price DESC
LIMIT 3;
```

**❓ คำถาม**: Query นี้ดึงข้อมูลอะไร? เรียงลำดับอย่างไร? แสดงกี่แถว? ผลลัพธ์คืออะไร?

> **💡 คำใบ้**: ลองดูตรง `WHERE` กับ `ORDER BY` สิครับ มันช่วยกรองและเรียงข้อมูลยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**มาแกะ Query นี้กัน:**
- `SELECT name, price` → ขอแค่ 2 คอลัมน์พอ คือ ชื่อสินค้า กับราคา
- `FROM products` → ไปหยิบข้อมูลมาจากตาราง products
- `WHERE is_available = true` → **เอาเฉพาะเมนูที่พร้อมขายนะ** (พวกที่หมดอย่าง "เอสเพรสโซ่" เราไม่เอา)
- `ORDER BY price DESC` → **เรียงตามราคาจากแพงสุดไปถูกสุด** (DESC มาจาก Descending)
- `LIMIT 3` → ขอแค่ **3 อันดับแรก** พอละ

**ผลลัพธ์:**
| name | price |
|---|---|
| ลาเต้ | 85 |
| โกโก้ | 75 |
| อเมริกาโน่ | 65 |

*หมายเหตุ: ชาเขียว (55) และชามะลิ (50) ไม่แสดงเพราะโดน LIMIT 3 ตัดออกไปจ้า*

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราลบ `LIMIT 3` ออก ผลลัพธ์ที่ได้จะเปลี่ยนไปยังไงบ้าง?
</details>

#### โจทย์ 1.2: ค้นหาลูกค้า

```sql
SELECT
  name AS ชื่อลูกค้า,
  membership AS ระดับสมาชิก,
  created_at AS วันที่สมัคร
FROM customers
WHERE membership = 'gold'
ORDER BY created_at ASC;
```

**❓ คำถาม**: Query นี้ค้นหาใคร? `AS` ทำหน้าที่อะไร? `ASC` หมายความว่าอะไร? ผลลัพธ์?

> **💡 คำใบ้**: สังเกตคำว่า `AS` ครับ มันช่วยเปลี่ยนชื่อคอลัมน์ยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**Query นี้ทำอะไร:**
- หาเฉพาะ **ลูกค้าระดับ Gold** เท่านั้นครับ (`WHERE membership = 'gold'`)
- `AS` คือการ **ตั้งชื่อเล่น (Alias)** ให้คอลัมน์ครับ ผลลัพธ์จะได้ออกมาเป็นภาษาไทยสวยๆ แทนชื่อคอลัมน์เดิม
- `ASC` ย่อมาจาก **Ascending** แปลว่าเรียงจากน้อยไปมาก หรือถ้าเป็นวันที่ก็คือ **จากเก่าไปใหม่** นั่นเอง

**ผลลัพธ์:**
| ชื่อลูกค้า | ระดับสมาชิก | วันที่สมัคร |
|---|---|---|
| สมศักดิ์ | gold | 2024-11-01 |
| สมชาย | gold | 2025-01-15 |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราใช้ `DESC` แทน `ASC` ในข้อนี้ จะเกิดอะไรขึ้น?
</details>

---

### 📖 Lv.2 — Filtering & Operators

**สิ่งที่จะได้ฝึก**: AND, OR, IN, BETWEEN, LIKE, IS NULL

#### โจทย์ 2.1: กรองด้วยเงื่อนไขหลายตัว

```sql
SELECT *
FROM orders
WHERE status IN ('completed', 'pending')
  AND order_date BETWEEN '2026-08-03' AND '2026-08-05'
  AND quantity >= 2;
```

**❓ คำถาม**: Query นี้กรองออเดอร์ตามเงื่อนไขอะไรบ้าง? `IN` ต่างจาก `OR` อย่างไร? `BETWEEN` รวมค่าขอบเขตมั้ย?

> **💡 คำใบ้**: ดูตรง `IN` กับ `BETWEEN` ให้ดีครับว่ามันต่างกันยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**โค้ดนี้ตั้งด่านตรวจไว้ 3 ด่าน (ต้องผ่านทุกด่านเพราะเราใช้ AND):**
1. `status IN ('completed', 'pending')` → สถานะต้องเป็น completed **หรือไม่ก็** pending เท่านั้น (อันที่ยกเลิกไปแล้วไม่นับ)
2. `BETWEEN '2026-08-03' AND '2026-08-05'` → ขอเป็นออเดอร์ตั้งแต่วันที่ 3 ถึง 5 สิงหา
3. `quantity >= 2` → ต้องสั่งตั้งแต่ 2 แก้วขึ้นไปด้วยนะ

**ใช้ `IN` ดีกว่า `OR` ยังไง?**
- จริงๆ มันมีค่าเท่ากับ `status = 'completed' OR status = 'pending'` แหละครับ
- แต่ใช้ `IN` เขียนสั้นกว่าเยอะ ยิ่งถ้ามีหลายๆ ค่าก็จะยิ่งอ่านง่ายครับ!

**BETWEEN คือการรวมหัวรวมหางด้วยนะ:**
- ใช่แล้ว! `BETWEEN '2026-08-03' AND '2026-08-05'` มันคือวันที่ 3, 4, 5 เต็มๆ เลย

**ผลลัพธ์:**
| id | customer_id | product_id | quantity | order_date | status |
|---|---|---|---|---|---|
| 5 | 4 | 4 | 2 | 2026-08-03 | completed |
| 7 | 5 | 2 | 2 | 2026-08-05 | completed |

*หมายเหตุ: ออเดอร์ id=4 ตกป๋องไปเพราะสั่งแค่แก้วเดียว (quantity=1) ไม่ผ่านเงื่อนไขเราครับ*

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเปลี่ยน `AND quantity >= 2` เป็น `OR quantity >= 2` ออเดอร์ที่ถูกดึงมาจะเยอะขึ้นหรือน้อยลง?
</details>

#### โจทย์ 2.2: ค้นหาด้วย LIKE

```sql
SELECT name, email
FROM customers
WHERE email LIKE '%mail.com'
  AND name LIKE 'สม%'
  AND membership != 'bronze';
```

**❓ คำถาม**: `%` ใน LIKE หมายความว่าอะไร? Query นี้ค้นหาลูกค้าแบบไหน? ใครบ้างที่ถูกตัดออก?

> **💡 คำใบ้**: เห็น `%` ใน `LIKE` มั้ยครับ มันมีความหมายว่ายังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**มารู้จัก `%` (Wildcard) กันก่อน:** มันคือตัวแทนของ "ตัวอักษรอะไรก็ได้ จะสั้นจะยาวแค่ไหนก็ได้":
- `'%mail.com'` → ขอแค่ลงท้ายด้วย "mail.com" ก็พอ ข้างหน้าจะเป็นอะไรช่างมัน
- `'สม%'` → ขอแค่ขึ้นต้นด้วย "สม" เป็นอันผ่าน ข้างหลังจะชื่ออะไรก็ได้

**เงื่อนไขที่เราตั้งไว้:**
1. อีเมลลงท้ายด้วย mail.com → **ทุกคนผ่าน** (ทุกคนใช้ @mail.com หมด)
2. ชื่อขึ้นต้นด้วย "สม" → **ทุกคนผ่านอีกแล้ว**
3. สมาชิกต้องไม่ใช่ระดับ bronze → **สมศรี (bronze) โดนตัดออกไปเลยจ้า**

**ผลลัพธ์:**
| name | email |
|---|---|
| สมชาย | somchai@mail.com |
| สมหญิง | somying@mail.com |
| สมศักดิ์ | somsak@mail.com |
| สมปอง | sompong@mail.com |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราลบ `%` ออกจาก `สม%` จะยังค้นหาลูกค้าชื่อ "สมศักดิ์" เจอไหม?
</details>

---

## 🟡 ระดับกลาง (Intermediate)

---

### 📖 Lv.3 — Aggregate Functions (ฟังก์ชันรวมกลุ่ม)

**สิ่งที่จะได้ฝึก**: COUNT, SUM, AVG, MAX, MIN, GROUP BY, HAVING

#### โจทย์ 3.1: สรุปยอดขายตามหมวดหมู่

```sql
SELECT
  p.category AS หมวดหมู่,
  COUNT(*) AS จำนวนออเดอร์,
  SUM(o.quantity) AS จำนวนแก้วรวม,
  SUM(o.quantity * p.price) AS ยอดขายรวม,
  ROUND(AVG(p.price), 0) AS ราคาเฉลี่ย
FROM orders o
JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed'
GROUP BY p.category
HAVING SUM(o.quantity * p.price) > 100
ORDER BY ยอดขายรวม DESC;
```

**❓ คำถาม**: Query นี้สรุปอะไร? `GROUP BY` ทำหน้าที่อะไร? `HAVING` ต่างจาก `WHERE` อย่างไร? `ROUND(..., 0)` ทำอะไร? `o` และ `p` คืออะไร?

> **💡 คำใบ้**: ลองดูที่ `HAVING` ครับ ว่ามันกรองผลลัพธ์ต่างจาก `WHERE` ตรงไหน

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**มาดูภาพรวมกัน:**
- Query นี้ตั้งใจจะดูยอดขาย **แยกตามหมวดหมู่** ครับ (พวก กาแฟ, ชา, อื่นๆ)
- โดยคิดเฉพาะออเดอร์ที่ชงเสร็จแล้ว **(completed)** เท่านั้น
- และเอาเฉพาะหมวดที่ทำ**ยอดขายรวมเกิน 100 บาท** ด้วยนะ

**แกะทีละจุด:**
- `GROUP BY p.category` → จับข้อมูลมากองรวมกันตามหมวดหมู่ก่อน แล้วค่อยเอาฟังก์ชันบวกลบคูณหาร (SUM, COUNT, AVG) มาคิดทีละกอง
- **`HAVING` ต่างกับ `WHERE` ยังไง?** → `WHERE` จะทำหน้าที่กรองข้อมูลแบบบรรทัดต่อบรรทัดก่อนล่วงหน้า แต่ `HAVING` เอาไว้กรองผลลัพธ์หลังจากที่เราจัดกลุ่ม (GROUP BY) ไปแล้วครับ (ลำดับคือ WHERE กรองก่อน → GROUP BY จัดกลุ่ม → HAVING กรองกลุ่มอีกที)
- `ROUND(..., 0)` → เป็นการปัดเศษทศนิยมทิ้งให้เป็นเลขกลมๆ สวยๆ
- ส่วนตัวอักษร `o` กับ `p` เราตั้งเป็น**ชื่อเล่น** (Table Alias) ให้ตาราง `orders` กับ `products` โค้ดจะได้สั้นลง พิมพ์ง่ายขึ้นเยอะ!

**ผลลัพธ์** (คำนวณเฉพาะออเดอร์ที่ status = completed):
| หมวดหมู่ | จำนวนออเดอร์ | จำนวนแก้วรวม | ยอดขายรวม | ราคาเฉลี่ย |
|---|---|---|---|---|
| กาแฟ | 4 | 6 | 430 | 72 |
| ชา | 1 | 3 | 165 | 55 |
| อื่นๆ | 2 | 3 | 225 | 75 |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราไม่ใส่ `GROUP BY p.category` เลย Query นี้จะรันผ่านมั้ย?
</details>

#### โจทย์ 3.2: หาลูกค้า VIP

```sql
SELECT
  c.name,
  COUNT(o.id) AS total_orders,
  SUM(o.quantity) AS total_items,
  MAX(o.order_date) AS last_order
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
GROUP BY c.id, c.name
HAVING COUNT(o.id) >= 2
ORDER BY total_orders DESC;
```

**❓ คำถาม**: ทำไมใช้ `LEFT JOIN` แทน `JOIN`? `AND o.status = 'completed'` อยู่ใน `ON` แทนที่จะอยู่ใน `WHERE` มีผลต่างกันมั้ย? HAVING ทำหน้าที่อะไรตรงนี้?

> **💡 คำใบ้**: ทำไมเขาถึงใช้ `LEFT JOIN` แทนที่จะเป็น `JOIN` ธรรมดา? ลองคิดดูสิ

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ทำไมต้องใช้ LEFT JOIN:**
- เพราะเราอยากดึงรายชื่อลูกค้ามา **ทุกคน** ครับ ต่อให้เค้าเพิ่งสมัครยังไม่ได้ซื้ออะไรเลย เราก็อยากให้อยู่ในลิสต์ด้วย (ถ้าใช้แค่ `INNER JOIN` คนที่ยังไม่ได้ซื้อจะโดนเตะออกจากลิสต์ทันที)

**จุดพีคของ `ON` กับ `WHERE`:**
- พอเราเอา `o.status = 'completed'` ไปวางไว้ใน **ON** มันจะทำการดึงเฉพาะออเดอร์ที่เสร็จแล้วมาประกบ แต่ลูกค้าก็ยังอยู่ครบทุกคนนะ (แค่จะไม่มีข้อมูลออเดอร์ขึ้น)
- แต่ถ้าเราไปใส่ใน **WHERE** เมื่อไหร่ ลูกค้าที่ยังไม่มี completed order จะโดนเขี่ยทิ้งเกลี้ยงเลย!

**หน้าที่ของ HAVING:**
- อันนี้เราเอาไว้กรองอีกรอบว่า "เอาเฉพาะคนที่มีจำนวนออเดอร์ (COUNT) ตั้งแต่ 2 ครั้งขึ้นไปนะ ถึงจะเรียกว่า VIP!"

**ผลลัพธ์:**
| name | total_orders | total_items | last_order |
|---|---|---|---|
| สมชาย | 3 | 4 | 2026-08-07 |
| สมหญิง | 2 | 4 | 2026-08-05 |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าลูกค้าคนนึงไม่เคยสั่งกาแฟเลย ในช่อง `total_items` ของเขาจะขึ้นว่าอะไร?
</details>

---

### 📖 Lv.4 — JOIN ตาราง (2 ตาราง)

**สิ่งที่จะได้ฝึก**: INNER JOIN, LEFT JOIN, RIGHT JOIN, ความสัมพันธ์ตาราง

#### โจทย์ 4.1: ดูรายละเอียดออเดอร์

```sql
SELECT
  o.id AS เลขออเดอร์,
  c.name AS ลูกค้า,
  p.name AS เครื่องดื่ม,
  o.quantity AS จำนวน,
  (o.quantity * p.price) AS ราคารวม,
  o.status AS สถานะ
FROM orders o
INNER JOIN customers c ON o.customer_id = c.id
INNER JOIN products p ON o.product_id = p.id
WHERE o.order_date = '2026-08-01';
```

**❓ คำถาม**: Query นี้ JOIN กี่ตาราง? ตาราง `orders` เชื่อมกับตารางอื่นอย่างไร? ทำไมถึงคำนวณ `o.quantity * p.price` ได้ทั้งที่อยู่คนละตาราง? ผลลัพธ์?

> **💡 คำใบ้**: ดูดีๆ ว่าเขาเอา `orders` ไปเชื่อมกับ `customers` และ `products` ยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**จอยทีเดียว 3 ตารางเลย!**
- งานนี้เราให้ `orders` เป็น**พระเอก** (ตารางหลัก) แล้วค่อยๆ แตกแขนงไปหาเพื่อนๆ:
  - ใช้ `customer_id` วิ่งไปหาตาราง `customers` เพื่อขโมยชื่อลูกค้ามาแสดง
  - ใช้ `product_id` วิ่งไปหาตาราง `products` เพื่อดึงชื่อเมนูและราคามาแปะ

**คำนวณข้ามตารางทำได้ไง?**
- พอเรา JOIN กันเสร็จ ข้อมูลจาก 3 ตารางก็จะมารวมร่างกันอยู่ในบรรทัดเดียวครับ ทำให้เราสามารถเอาจำนวนแก้ว (`o.quantity`) ไปคูณกับราคา (`p.price`) ข้ามตารางได้เลยแบบเนียนๆ ไม่มีใครว่า

**ผลลัพธ์** (ของวันที่ 2026-08-01):
| เลขออเดอร์ | ลูกค้า | เครื่องดื่ม | จำนวน | ราคารวม | สถานะ |
|---|---|---|---|---|---|
| 1 | สมชาย | อเมริกาโน่ | 2 | 130 | completed |
| 2 | สมชาย | ลาเต้ | 1 | 85 | completed |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าตาราง `products` โดนลบทิ้งไป จะเกิดอะไรขึ้นกับ Query นี้?
</details>

---

### 📖 Lv.5 — JOIN หลายตารางและ Self JOIN

**สิ่งที่จะได้ฝึก**: JOIN 3+ ตาราง, LEFT JOIN เปรียบเทียบ

#### โจทย์ 5.1: ออเดอร์พร้อมรีวิว

```sql
SELECT
  o.id,
  c.name AS ลูกค้า,
  p.name AS เครื่องดื่ม,
  o.status,
  r.rating,
  r.comment
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
LEFT JOIN order_reviews r ON o.id = r.order_id
WHERE o.status = 'completed'
ORDER BY o.order_date DESC;
```

**❓ คำถาม**: ทำไม `order_reviews` ใช้ `LEFT JOIN` ในขณะที่ตารางอื่นใช้ `JOIN`? ออเดอร์ที่ไม่มีรีวิวจะแสดงอย่างไร?

> **💡 คำใบ้**: ทำไม `order_reviews` ถึงเป็นตารางเดียวที่ใช้ `LEFT JOIN`?

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**ทำไมถึงใช้ LEFT JOIN แค่กับ reviews ตัวเดียวนะ?**
- ก็เพราะว่า **ไม่ใช่ทุกคนที่กินเสร็จแล้วจะมารีวิวนี่นา!** ถ้าเราใช้ `JOIN` ปกติ ออเดอร์ไหนที่ลูกค้าขี้เกียจรีวิว มันจะโดนซ่อนหายไปเลย
- เราเลยใช้ `LEFT JOIN` เพื่อดึงออเดอร์มาโชว์ให้หมดก่อน ส่วนอันไหนไม่มีรีวิวก็แค่ปล่อยให้เป็นช่องว่างๆ (`NULL`) ไปก็พอ
- ส่วนการเชื่อมกับตาราง `customers` และ `products` เราใช้ `JOIN` ธรรมดาได้เลย เพราะทุกออเดอร์ยังไงมันก็ต้องมีลูกค้าและมีเมนูแน่ๆ ขาดไม่ได้ฮะ

**หน้าตาออเดอร์ที่ไม่มีรีวิวจะเป็นแบบนี้:**
| id | ลูกค้า | เครื่องดื่ม | status | rating | comment |
|---|---|---|---|---|---|
| 10 | สมชาย | โกโก้ | completed | 4 | โกโก้วันนี้อร่อย |
| 8 | สมหญิง | อเมริกาโน่ | completed | **NULL** | **NULL** |
| 7 | สมปอง | ลาเต้ | completed | 5 | ลาเต้นุ่มมาก |
| ... | ... | ... | ... | ... | ... |

*(ออเดอร์ id=8 ไม่มีใครมารีวิว ช่อง rating กับ comment เลยกลายเป็น NULL ไปโดยปริยาย)*

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราเปลี่ยนจาก `LEFT JOIN` เป็น `INNER JOIN` ออเดอร์ที่ไม่มีรีวิวจะหายไปไหม?
</details>

---

## 🟠 ระดับสูง (Advanced)

---

### 📖 Lv.6 — Subquery (Query ซ้อน Query)

**สิ่งที่จะได้ฝึก**: Subquery in WHERE, IN, EXISTS, Correlated subquery

#### โจทย์ 6.1: ลูกค้าที่สั่งเครื่องดื่มแพงที่สุด

```sql
SELECT DISTINCT c.name, c.membership
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.product_id IN (
  SELECT id
  FROM products
  WHERE price = (SELECT MAX(price) FROM products)
);
```

**❓ คำถาม**: มี Subquery กี่ชั้น? แต่ละชั้นทำอะไร? `DISTINCT` ทำไมต้องใช้?

> **💡 คำใบ้**: ลองอ่าน Subquery จากชั้นในสุด (MAX price) ออกมาข้างนอกดูครับ

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**มี Subquery ซ้อนกันถึง 2 ชั้น! (วิธีอ่านคือแกะจากไข่แดงข้างในสุดออกมาก่อนนะ):**

1. **ชั้นในสุด**: `SELECT MAX(price) FROM products` → ถามว่า "ในร้านเรา เมนูไหนราคาแพงสุด?" (ได้คำตอบมาคือ 85 บาท)
2. **ชั้นกลาง**: `SELECT id FROM products WHERE price = 85` → ถามต่อว่า "อ้าว แล้วไอ้เมนูที่ราคา 85 บาทเนี่ย มันคือเมนู id อะไรล่ะ?" (ได้คำตอบคือ id = 2 ซึ่งก็คือลาเต้)
3. **ชั้นนอกสุด**: ทีนี้พอได้ `product_id = 2` มาแล้ว ก็เอาไปใช้กรองหาชื่อลูกค้าต่อเลยว่า "ไหนดูซิ มีลูกค้าคนไหนเคยสั่งเมนูรหัส 2 บ้าง"

**แล้ว `DISTINCT` เอาไว้ทำไม?**
- ลูกค้าบางคนอาจจะสั่งลาเต้แก้วโปรดไปแล้วหลายครั้ง ถ้าเราไม่ใส่ `DISTINCT` ดักเอาไว้ ชื่อเค้าก็จะโผล่มาซ้ำๆ เบิ้ลๆ ครับ การใส่ไว้ก็เพื่อกรองให้เหลือชื่อละบรรทัดเดียวพอ

**ผลลัพธ์:**
| name | membership |
|---|---|
| สมชาย | gold |
| สมปอง | silver |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้ามีสินค้า 2 อย่างที่ราคาแพงสุดเท่ากัน (เช่น 85 บาททั้งคู่) Query นี้จะยังทำงานถูกมั้ย?
</details>

#### โจทย์ 6.2: ลูกค้าที่ไม่เคยสั่ง

```sql
SELECT name, email
FROM customers
WHERE id NOT IN (
  SELECT DISTINCT customer_id
  FROM orders
);
```

**❓ คำถาม**: Query นี้หาอะไร? `NOT IN` ทำงานอย่างไร? มีวิธีอื่นเขียนให้ได้ผลเหมือนกันมั้ย?

> **💡 คำใบ้**: สังเกต `NOT IN` ครับ มันกำลังหากลุ่มลูกค้าแบบไหนอยู่

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**เป้าหมายคือหา "ลูกค้าที่สมัครไว้แต่ไม่ยอมซื้อของซะที":**
1. **ข้างใน (Subquery):** `SELECT DISTINCT customer_id FROM orders` → มันจะไปกวาดรหัสลูกค้าทุกคนที่ "เคยมีออเดอร์" ออกมาก่อน
2. **ข้างนอก:** `WHERE id NOT IN (...)` → ทีนี้เราก็แค่เอาเฉพาะรหัสลูกค้าที่ **ไม่อยู่ในกลุ่มคนเคยสั่ง** แค่นี้ก็ได้ลูกค้าผีแล้ว!

**ผลลัพธ์:** ว่างเปล่า (0 แถว เพราะทุกคนเคยสั่งหมดแล้วฮะ)

**รู้หรือไม่? เราเขียนด้วยวิธีอื่นได้อีกตั้งเยอะนะ!**

แบบแรก ใช้ **LEFT JOIN**: 
- เอา customers มาต่อกับ orders แล้วหาคนที่เชื่อมกันไม่ติด (`o.id IS NULL`)
```sql
SELECT c.name, c.email
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE o.id IS NULL;
```

แบบที่สอง ใช้ **NOT EXISTS**: 
- ท่านี้จะเซฟและแนะนำมากกว่า `NOT IN` ตรงที่มันไม่มีบั๊กปวดหัวกับเรื่องข้อมูลค่า `NULL` ครับ
```sql
SELECT name, email
FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าในตาราง `orders` มี `customer_id` บางแถวเป็น `NULL` คำสั่ง `NOT IN` นี้จะมีปัญหาไหม?
</details>

---

### 📖 Lv.7 — INSERT, UPDATE, DELETE

**สิ่งที่จะได้ฝึก**: Data Manipulation Language (DML)

#### โจทย์ 7.1: จัดการข้อมูลสินค้า

```sql
-- เพิ่มสินค้าใหม่
INSERT INTO products (name, category, price, is_available)
VALUES ('มัทฉะลาเต้', 'ชา', 90, true);

-- อัปเดตราคาสินค้าหมวดกาแฟ ขึ้น 10%
UPDATE products
SET price = ROUND(price * 1.10, 0)
WHERE category = 'กาแฟ' AND is_available = true;

-- ลบสินค้าที่ไม่พร้อมขาย
DELETE FROM products
WHERE is_available = false;
```

**❓ คำถาม**: คำสั่งทั้ง 3 ทำอะไรบ้าง? หลัง UPDATE ราคาอเมริกาโน่จะเป็นเท่าไหร่? DELETE จะลบสินค้าตัวไหน? ถ้าไม่ใส่ WHERE ใน DELETE จะเกิดอะไร?

> **💡 คำใบ้**: ลองเปรียบเทียบ `INSERT`, `UPDATE`, `DELETE` ดูว่ามันแก้อะไรในตาราง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**มาดูทีละคำสั่งกันฮะ:**
- **คำสั่ง 1 (`INSERT`):** เอาไว้เพิ่มเมนูใหม่ "มัทฉะลาเต้" จัดเข้าหมวด "ชา" และตั้งราคาไว้ที่ 90 บาทสวยๆ
- **คำสั่ง 2 (`UPDATE`):** อันนี้โหดหน่อย เราสั่งขึ้นราคากาแฟทุกตัวอีก 10% (เลยคูณ 1.10) แล้วปัดเศษให้กลมๆ อเมริกาโน่จะพุ่งไปที่ 72 บาท ส่วนลาเต้โดดไป 94 บาทเลย! (แต่เอสเพรสโซ่รอดตัวไป เพราะไม่ได้ตั้ง `is_available = true` ไว้)
- **คำสั่ง 3 (`DELETE`):** เอาไว้เคลียร์ของ สั่งลบเมนูที่สถานะ `is_available = false` ออกจากระบบไปซะ ซึ่งแจ็คพอตก็ไปตกที่ "เอสเพรสโซ่" ตัวเดียวนั่นแหละ

⚠️ **คำเตือนสติ!** ถ้าเราสั่ง `DELETE FROM products;` แบบลืมใส่ `WHERE` ต่อท้ายเมื่อไหร่... พังครับพี่น้อง! ข้อมูลสินค้าจะหายเกลี้ยงไปทั้งตารางเลยน้า อย่าหาทำเชียว!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราลืมใส่ `WHERE category = 'กาแฟ'` ในคำสั่ง UPDATE ราคาสินค้าหมวดอื่นจะเปลี่ยนตามไหม?
</details>

---

### 📖 Lv.8 — CREATE TABLE & Database Design

**สิ่งที่จะได้ฝึก**: DDL, PRIMARY KEY, FOREIGN KEY, Constraints

#### โจทย์ 8.1: ออกแบบตารางคูปอง

```sql
CREATE TABLE coupons (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code VARCHAR(20) UNIQUE NOT NULL,
  discount_percent DECIMAL(5,2) CHECK (discount_percent > 0 AND discount_percent <= 100),
  min_order_amount DECIMAL(10,2) DEFAULT 0,
  max_uses INTEGER DEFAULT 1,
  current_uses INTEGER DEFAULT 0,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  created_by INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  CHECK (valid_until > valid_from)
);
```

**❓ คำถาม**: ตารางนี้มี Constraint อะไรบ้าง? `UNIQUE NOT NULL` ทำหน้าที่อะไร? `ON DELETE SET NULL` หมายความว่าอะไร? CHECK constraint ป้องกันอะไร?

> **💡 คำใบ้**: ดูที่ `CHECK` กับ `UNIQUE` สิครับ มันช่วยป้องกันข้อมูลเละเทะได้ยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**กฎเหล็ก (Constraints) ของตารางนี้มีเพียบเลย มาไล่ดูกัน:**

1. **`PRIMARY KEY`** (`id`) — อันนี้คลาสสิกสุด รหัสต้องไม่ซ้ำ ห้ามเป็นค่าว่าง และรันไปเรื่อยๆ อัตโนมัติ (Auto-increment)
2. **`UNIQUE NOT NULL`** (`code`) — โค้ดคูปองอันนี้ห้ามซ้ำกับใครเด็ดขาด! และบังคับกรอกเสมอ ห้ามปล่อยว่าง
3. **`CHECK`** (`discount_percent`) — ดักเอาไว้ว่า ส่วนลดต้องมากกว่า 0 และไม่เกิน 100% นะ (ลด 150% ร้านเจ๊งพอดี)
4. **`DEFAULT`** — ถ้ายัดข้อมูลมาแบบไม่ครบ ก็ให้ใช้ค่าเริ่มต้นตามนี้ไปก่อนเลย เช่น ตั้งค่าใช้ขั้นต่ำ 0 บาทไป
5. **`FOREIGN KEY ... REFERENCES`** — เป็นการผูกมิตร บังคับว่าคูปองนี้ต้องถูกสร้างโดย `id` ของคนที่มีตัวตนอยู่จริงในตาราง `customers` เท่านั้น
6. **`ON DELETE SET NULL`** — ถ้าเกิดลบข้อมูลคนสร้างคูปองนี้ทิ้งไป ก็ไม่ต้องตามไปลบคูปองเค้านะฮะ แค่เปลี่ยนชื่อคนสร้างให้กลายเป็นช่องว่าง (`NULL`) ก็พอ
7. **`CHECK` (ด้านล่างสุด)** — เป็นการดักว่า "เห้ย วันหมดอายุ ต้องมาก่อนวันเริ่มใช้ไม่ได้นะเว้ย!"

**ตัวอย่างถ้าจะฝืนกฎ:**
- ลองใส่ส่วนลดเกินเบอร์ `discount_percent = 150` → จะติด Error ทันที เพราะไม่ผ่านด่าน CHECK constraint
- ลองสร้าง `code` ซ้ำกับที่มีอยู่ → ก็ติด Error รัวๆ เพราะโดนดักด้วย UNIQUE constraint ครับ

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราใส่ค่า `discount_percent` เป็น 0 จะรันผ่านไหม? (ดูเงื่อนไขดีๆ)
</details>

---

## 🔴 ระดับท้าทาย (Challenge)

---

### 📖 Lv.9 — Window Functions

**สิ่งที่จะได้ฝึก**: ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY, OVER

#### โจทย์ 9.1: จัดอันดับลูกค้าตามยอดสั่ง

```sql
SELECT
  c.name,
  p.category,
  SUM(o.quantity * p.price) AS total_spent,
  RANK() OVER (ORDER BY SUM(o.quantity * p.price) DESC) AS overall_rank,
  RANK() OVER (PARTITION BY p.category ORDER BY SUM(o.quantity * p.price) DESC) AS category_rank
FROM orders o
JOIN customers c ON o.customer_id = c.id
JOIN products p ON o.product_id = p.id
WHERE o.status = 'completed'
GROUP BY c.name, p.category;
```

**❓ คำถาม**: `RANK() OVER (...)` ทำอะไร? `PARTITION BY` ต่างจาก `GROUP BY` อย่างไร? `overall_rank` กับ `category_rank` แสดงข้อมูลต่างกันอย่างไร?

> **💡 คำใบ้**: ลองเทียบ `overall_rank` กับ `category_rank` ว่าตัวเลขมันนับต่อกันยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**`RANK() OVER (...)` คือท่าไม้ตาย!**
- มันคือ **Window Function** ครับ ข้อดีของมันคือสามารถจัดอันดับได้โดยที่ **บรรทัดไม่ต้องหดตัวรวมกัน** (ไม่เหมือน GROUP BY ที่จะโดนยุบจนเหลือบรรทัดเดียว)
- ส่วน `ORDER BY ... DESC` ข้างใน ก็คือสั่งให้มันจัดจากอันดับคนที่เปย์เยอะสุดลงไปหาน้อยสุด

**แล้ว `PARTITION BY` ล่ะ ต่างกับ `GROUP BY` ตรงไหน?**
- `GROUP BY` คือการจับข้อมูลมากองรวมกันแล้ว "ยุบให้เป็นก้อนเดียว"
- `PARTITION BY` จะใช้คู่กับ Window Function มันหมายความว่า "เห้ยๆ ช่วยเริ่มนับอันดับ 1 ใหม่ให้หน่อยนะ ตอนที่หมวดหมู่มันเปลี่ยนไป" ซึ่งข้อมูลทุกบรรทัดก็ยังโชว์ออกมาครบเหมือนเดิม

**ผลลัพธ์ของ 2 คอลัมน์ที่ได้ เลยต่างกันแบบนี้ฮะ:**
- `overall_rank` → จัดอันดับแบบรวมมิตรเลย ใครสายเปย์สุดในร้าน ก็เอาที่ 1 ไปครอง
- `category_rank` → แต่อันนี้เราแอบใส่ `PARTITION BY p.category` เข้าไปด้วย มันก็เลยจะแยกจัดอันดับให้ว่า ใครคือสายเปย์แห่งวงการกาแฟ หรือใครคือเจ้าพ่อแห่งวงการชา นั่นเอง!

**ลองดูผลลัพธ์ของจริง:**
| name | category | total_spent | overall_rank | category_rank |
|---|---|---|---|---|
| สมชาย | กาแฟ | 215 | 1 | 1 |
| สมปอง | กาแฟ | 170 | 2 | 2 |
| สมหญิง | ชา | 165 | 3 | 1 |
| สมชาย | อื่นๆ | 75 | 4 | 1 |
| สมหญิง | กาแฟ | 65 | 5 | 3 |
| สมศรี | อื่นๆ | 150 | ... | ... |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าไม่ใช้ `PARTITION BY p.category` แล้ว ผลลัพธ์ของ 2 คอลัมน์นี้จะเหมือนกันเป๊ะเลยไหม?
</details>

---

### 📖 Lv.10 — Complex Real-World Query (CTE, CASE, ผสมทุกอย่าง)

**สิ่งที่จะได้ฝึก**: Common Table Expression (WITH), CASE WHEN, Complex JOIN + Aggregation

#### โจทย์ 10.1: รายงานสรุปลูกค้า VIP

```sql
WITH customer_stats AS (
  SELECT
    c.id,
    c.name,
    c.membership,
    COUNT(o.id) AS order_count,
    COALESCE(SUM(o.quantity * p.price), 0) AS total_spent,
    MAX(o.order_date) AS last_order_date
  FROM customers c
  LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
  LEFT JOIN products p ON o.product_id = p.id
  GROUP BY c.id, c.name, c.membership
),
review_stats AS (
  SELECT
    o.customer_id,
    ROUND(AVG(r.rating), 1) AS avg_rating,
    COUNT(r.id) AS review_count
  FROM order_reviews r
  JOIN orders o ON r.order_id = o.id
  GROUP BY o.customer_id
)
SELECT
  cs.name,
  cs.membership,
  cs.order_count,
  cs.total_spent,
  cs.last_order_date,
  COALESCE(rs.avg_rating, 0) AS avg_rating,
  COALESCE(rs.review_count, 0) AS review_count,
  CASE
    WHEN cs.total_spent >= 300 AND cs.order_count >= 3 THEN '🌟 VIP'
    WHEN cs.total_spent >= 150 THEN '⭐ Regular'
    WHEN cs.order_count > 0 THEN '👤 New'
    ELSE '😴 Inactive'
  END AS customer_tier,
  CASE
    WHEN cs.last_order_date >= DATE('now', '-7 days') THEN '🟢 Active'
    WHEN cs.last_order_date >= DATE('now', '-30 days') THEN '🟡 Moderate'
    ELSE '🔴 Dormant'
  END AS activity_status
FROM customer_stats cs
LEFT JOIN review_stats rs ON cs.id = rs.customer_id
ORDER BY cs.total_spent DESC;
```

**❓ คำถาม**: CTE (`WITH ... AS`) คืออะไรและทำไมถึงใช้? มีกี่ CTE? `COALESCE` ทำหน้าที่อะไร? `CASE WHEN` ตัวแรกจัดระดับลูกค้าอย่างไร? ทำไม query นี้ไม่เขียนรวมเป็น query เดียว?

> **💡 คำใบ้**: เห็น `WITH customer_stats AS ...` มั้ยครับ เขาพยายามจัดกลุ่มตารางยังไง

<details>
<summary>🔑 คลิกดูเฉลย</summary>

**CTE (`WITH ... AS`) คืออะไร?**
- อารมณ์เหมือนเราแอบสร้าง **"ตารางจำลองชั่วคราว"** ขึ้นมาก่อนครับ แล้วค่อยเรียกเอามาใช้ทีหลัง
- ข้อดีคือทำให้โค้ดที่ดูซับซ้อน กลายเป็นสัดส่วนและอ่านง่ายขึ้นเยอะมาก ไม่ต้องไปงมเขียน Subquery ซ้อนกันเป็นงูกินหาง

**ในโค้ดนี้เราแยกทำไว้ 2 ตารางย่อยนะ:**
1. `customer_stats` → ไปกวาดข้อมูลลูกค้ามาให้หมดว่าสั่งไปกี่ครั้ง จ่ายตังค์ไปเท่าไหร่แล้วบ้าง
2. `review_stats` → ไปรวบรวมคะแนนรีวิวของลูกค้ามาเตรียมไว้
- แล้วสุดท้ายใน Query หลัก เราก็ค่อยจับ 2 ก้อนนี้มา JOIN กัน แล้วค่อยๆ แจกป้ายให้ลูกค้า

**ฟังก์ชันเจ๋งๆ ที่ซ่อนอยู่:**
- **`COALESCE(ค่า, 0)`:** อันนี้คือตัวกันเหนียวชั้นยอดครับ สมมติถ้าค่านั้นมันเป็นช่องโหว่ (`NULL` - แบบว่าลูกค้าไม่เคยรีวิวเลย) มันก็จะจับแปลงร่างเป็น 0 ให้ทันที จะได้เอาไปคำนวณต่อได้โดยที่โค้ดไม่พัง
- **`CASE WHEN`:** ให้นึกซะว่ามันคือการเขียน if-else แบบเท่ๆ ใน SQL มันจะไล่เช็คเงื่อนไขจากบรรทัดบนลงล่างไปเรื่อยๆ:
  1. จ่ายถึง 300 และสั่ง 3 ครั้งขึ้นไปใช่ป่ะ? งั้นเอาป้าย 🌟 VIP ไปเลย!
  2. อ้าวไม่ถึงหรอ... งั้นจ่ายถึง 150 รึเปล่า? ถ้าถึงก็เอาป้าย ⭐ Regular ไป
  3. ถ้ายังไม่ถึงอีก แต่ก็เคยสั่งอยู่นะ งั้นรับป้าย 👤 New ไปก่อนละกัน
  4. ถ้านอกเหนือจากนี้คือพวกไม่เคยสั่งเลย ก็แปะป้าย 😴 Inactive โลดดด

**ทำไมเราไม่มัดรวมกันเป็น Query เดียวยาวๆ ไปเลยล่ะ?**
- โอ้โห ถ้ารวมกันโค้ดคงจะอีรุงตุงนังมากฮะ! การใช้ CTE เข้ามาช่วย ทำให้เราอ่านลอจิกเป็นฉากๆ ได้เหมือนอ่านนิทาน โค้ดดูคลีนขึ้น ลดความปวดหัวตอนต้องกลับมาแก้ทีหลังไปได้เยอะเลย!

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราใช้ `INNER JOIN` แทน `LEFT JOIN` ในการดึง `review_stats` ลูกค้าที่ไม่เคยรีวิวจะหายไปจากรายงานนี้ไหม?
</details>

---


---

## 🚀 เส้นทางอัปสกิล: Junior สู่ Senior (SQL Code Evolution)

---

### 🗄️ Lv.12 — Junior vs Senior (การนับและจัดกลุ่ม)

**สิ่งที่จะได้ฝึก**: การใช้พลังของ `GROUP BY` แทนที่จะต้องมาเขียน Query แยกกันทีละอัน

#### ตัวอย่างโจทย์ 12.1: หายอดขายของเมนู กาแฟ ชา และอื่นๆ

**โค้ด (Junior Level):**
```sql
-- ต้องรัน 3 รอบ!
SELECT SUM(quantity) FROM orders JOIN products ON orders.product_id = products.id WHERE category = 'กาแฟ';
SELECT SUM(quantity) FROM orders JOIN products ON orders.product_id = products.id WHERE category = 'ชา';
SELECT SUM(quantity) FROM orders JOIN products ON orders.product_id = products.id WHERE category = 'อื่นๆ';
```

**❓ คำถาม**: ถ้าอนาคตร้านเรามีหมวดหมู่เครื่องดื่ม 20 หมวด โค้ดแบบนี้จะมีปัญหาอะไร?

> **💡 คำใบ้**: การเขียนแบบนี้เรียก Hard-code ถ้าร้านมีหมวด "สมูทตี้" เพิ่มมา เราจะรู้ยอดขายของสมูทตี้ไหมถ้าไม่มานั่งแก้โค้ด?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
1. **เหนื่อยฟรี**: ต้องรัน Query ถึง 3 รอบ ยิ่งหมวดเยอะยิ่งรันเยอะ (กินภาระ Database)
2. **Hard-code**: ถ้าเพิ่มหมวดหมู่ใหม่ ก็ต้องกลับมาพิมพ์คำสั่ง SELECT ใหม่อีกบรรทัด 

**โค้ดวิวัฒนาการร่าง Senior Level:**
ใช้ `GROUP BY` สั่ง Database ให้จัดกลุ่มและคำนวณรวดเดียวจบ!
```sql
SELECT 
  products.category,
  SUM(orders.quantity) AS total_sold
FROM orders
JOIN products ON orders.product_id = products.id
GROUP BY products.category;
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- **Dynamic**: ไม่ว่าร้านจะเพิ่มหมวดหมู่มากี่หมวด โค้ดนี้บรรทัดเดิม ก็จะคำนวณออกมาให้ครบทุกหมวดทันที
- **Performance**: ยิง Database แค่รอบเดียว (Single Trip)

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากจะแสดงเฉพาะหมวดหมู่ที่ขายได้มากกว่า 3 แก้วขึ้นไป เราควรใช้คำสั่ง `WHERE total_sold > 3` หรือ `HAVING SUM(quantity) > 3` ดี?
</details>

---


#### ตัวอย่างโจทย์ 12.2: รายงานสรุปยอดขายรายเดือนพร้อมเปอร์เซ็นต์สัดส่วน

**โค้ด (Junior Level):**
```sql
-- รันรอบที่ 1: หายอดรวมทั้งหมดก่อน
SELECT SUM(quantity * price) as grand_total FROM orders JOIN products ON orders.product_id = products.id;
-- จดตัวเลขไว้ เช่น 5000

-- รันรอบที่ 2: คำนวณยอดแต่ละหมวด แล้วเอาไปหาร Grand Total ด้วยมือ
SELECT category, SUM(quantity * price) as cat_total FROM orders JOIN products ON orders.product_id = products.id GROUP BY category;
-- แล้วเอา cat_total / 5000 * 100 ด้วยเครื่องคิดเลข
```

**❓ คำถาม**: ทำไม Junior ถึงต้องรัน 2 รอบแล้วเอาเครื่องคิดเลขมาช่วย? มีวิธีให้ SQL คำนวณทุกอย่างจบใน Query เดียวไหม?

> **💡 คำใบ้**: ลองนึกถึง Subquery ที่ใส่ไว้ข้างใน SELECT ดูสิ มันจะช่วยดึงยอดรวมมาหารได้ทันทีเลยนะ!

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**โค้ด Senior Level:**
```sql
SELECT 
  products.category,
  SUM(orders.quantity * products.price) AS cat_total,
  ROUND(
    SUM(orders.quantity * products.price) * 100.0 / 
    (SELECT SUM(o2.quantity * p2.price) FROM orders o2 JOIN products p2 ON o2.product_id = p2.id),
    1
  ) AS percentage
FROM orders
JOIN products ON orders.product_id = products.id
GROUP BY products.category
ORDER BY cat_total DESC;
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- ทุกอย่างจบใน Query เดียว! ไม่ต้องจดตัวเลขแล้วเอาไปคำนวณด้วยมือ
- ใช้ Subquery `(SELECT SUM(...))` ข้างใน SELECT เพื่อดึง Grand Total มาหารได้ทันที
- `ROUND(..., 1)` ปัดเศษให้เป็นทศนิยม 1 ตำแหน่ง อ่านง่าย

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากแสดงเฉพาะหมวดที่มีสัดส่วนมากกว่า 20% เราจะใส่ `WHERE percentage > 20` หรือ `HAVING percentage > 20` ดี?
</details>

---

### 🗄️ Lv.13 — Junior vs Senior (การจัดการเงื่อนไข)

**สิ่งที่จะได้ฝึก**: เลิกใช้ `UNION` พร่ำเพรื่อ และหันมาใช้ `CASE WHEN`

#### ตัวอย่างโจทย์ 13.1: แบ่งกลุ่มลูกค้าตามแต้มซื้อของ

**โค้ด (Junior Level):**
```sql
-- หาคนที่ยอดซื้อเกิน 5 แก้ว เป็น VIP
SELECT customers.name, 'VIP' AS status
FROM customers JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.id
HAVING SUM(orders.quantity) >= 5

UNION

-- หาคนที่ยอดซื้อไม่ถึง 5 แก้ว เป็น Regular
SELECT customers.name, 'Regular' AS status
FROM customers JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.id
HAVING SUM(orders.quantity) < 5;
```

**❓ คำถาม**: การใช้ `UNION` เอา Query 2 ก้อนมาต่อกันแบบนี้ เปลืองพลังงาน Database ขนาดไหน?

> **💡 คำใบ้**: ลองสังเกตว่า Query ท่อนบน กับ ท่อนล่าง มันแทบจะหน้าตาเหมือนกันเป๊ะเลย Database ต้องไปควานหาข้อมูลเดิมซ้ำสองรอบไหม?

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
- **ทำซ้ำซ้อน (Double Scan)**: Database ต้องไปไล่ Join ตารางและจัดกลุ่มข้อมูลทั้งหมด ถึง 2 รอบ แล้วเอาผลลัพธ์มาแปะต่อกัน เสียเวลามาก

**โค้ดวิวัฒนาการร่าง Senior Level:**
ใช้ `CASE WHEN` (เหมือน `if-else` ใน SQL) สแกนรอบเดียวจบ
```sql
SELECT 
  customers.name,
  SUM(orders.quantity) AS total_cups,
  CASE 
    WHEN SUM(orders.quantity) >= 5 THEN 'VIP'
    ELSE 'Regular'
  END AS status
FROM customers 
JOIN orders ON customers.id = orders.customer_id
GROUP BY customers.name;
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- สแกนและ Join ข้อมูลแค่รอบเดียว เร็วกว่าเห็นๆ 
- โค้ดอ่านง่าย ไหลเป็นเส้นตรง ไม่ต้องคอยเทียบว่าบนกับล่างต่างกันตรงไหน
- ถ้าวันนึงจะมีระดับ 'Super VIP' ก็แค่เติม `WHEN` เข้าไป ไม่ต้องไปงอกก้อน `UNION` ใหม่

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากแบ่งเกรดคะแนนสอบ (A, B, C, D, F) ใน Database การใช้ `CASE WHEN` จะช่วยให้โค้ดสั้นลงกว่าการเขียนใน Backend Javascript หรือไม่?
</details>

---


#### ตัวอย่างโจทย์ 13.2: แบ่งกลุ่มราคาสินค้าเป็นหลายช่วง (Price Range)

**โค้ด (Junior Level):**
```sql
-- รันทีละบรรทัด!
SELECT COUNT(*) FROM products WHERE price < 50;
SELECT COUNT(*) FROM products WHERE price >= 50 AND price < 70;
SELECT COUNT(*) FROM products WHERE price >= 70 AND price < 90;
SELECT COUNT(*) FROM products WHERE price >= 90;
```

**❓ คำถาม**: ถ้าหัวหน้าอยากแบ่งช่วงราคาเป็น 10 ช่วง โค้ดนี้จะต้องเขียนกี่บรรทัด? มี Query เดียวที่ทำได้ไหม?

> **💡 คำใบ้**: ลองนึกถึง `CASE WHEN` ที่ช่วย "แปะป้ายชื่อ" ให้แต่ละแถว แล้วค่อย `GROUP BY` ตามป้ายนั้น

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**โค้ด Senior Level:**
```sql
SELECT 
  CASE 
    WHEN price < 50 THEN 'ราคาถูก (ต่ำกว่า 50)'
    WHEN price < 70 THEN 'ราคากลาง (50-69)'
    WHEN price < 90 THEN 'ราคาสูง (70-89)'
    ELSE 'ราคาพรีเมียม (90+)'
  END AS price_range,
  COUNT(*) AS product_count,
  ROUND(AVG(price), 0) AS avg_price
FROM products
GROUP BY price_range
ORDER BY MIN(price);
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- Query เดียวจบ! ไม่ต้องรัน 4 รอบ (หรือ 10 รอบถ้ามี 10 ช่วง)
- ได้ผลลัพธ์เป็นตารางสวยๆ พร้อมจำนวนและค่าเฉลี่ยของแต่ละช่วง
- ง่ายต่อการเปลี่ยนเงื่อนไขช่วงราคา

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากรู้ว่าช่วงราคาไหน "ขายดีที่สุด" (ตามจำนวน orders) เราจะ JOIN ตาราง orders เข้ามาแล้ว GROUP BY price_range ยังไง?
</details>

---

### 🗄️ Lv.14 — Junior vs Senior (เรื่องสถิติเชิงลึก)

**สิ่งที่จะได้ฝึก**: การทำลำดับหรือผลรวมสะสมโดยไม่ต้องเขียน Subquery รุงรัง (รู้จักกับ Window Functions)

#### ตัวอย่างโจทย์ 14.1: จัดอันดับสินค้าขายดี (Rank)

**โค้ด (Junior Level):**
```sql
-- ดึงยอดขายทั้งหมดออกมาก่อน แล้วค่อยเอาไปวนลูปจัดอันดับใน Javascript / Python (Backend)
SELECT 
  product_id, 
  SUM(quantity) as total 
FROM orders 
GROUP BY product_id 
ORDER BY total DESC;
```
*(Junior มักจะยอมแพ้ในการจัดลำดับใน SQL แล้วโยนภาระไปให้ฝั่ง Backend เขียนลูป `for` จัดลำดับเอาเอง)*

**❓ คำถาม**: ถ้าเรามีสินค้า 100,000 ชิ้น การโยนข้อมูล 1 แสนแถวไปให้ Backend นั่งจัดลำดับ จะทำให้แอปพลิเคชันของเราช้าหรือเปล่า?

> **💡 คำใบ้**: การโอนย้ายข้อมูลใหญ่ๆ ข้าม Network จาก Database ไปยัง Web Server เป็นเรื่องที่กินเวลามากที่สุดในการเขียนโปรแกรมเลยนะ!

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**จุดอ่อนของโค้ด Junior:**
- การขนข้อมูลมหาศาลออกจาก Database ไปจัดเรียงข้างนอก ทำให้เกิดปัญหาคอขวด (Network Bottleneck) และกิน RAM ของ Web Server มหาศาล

**โค้ดวิวัฒนาการร่าง Senior Level:**
ใช้ **Window Function** ให้ Database ซึ่งเก่งเลขที่สุด จัดอันดับให้เสร็จสรรพ!
```sql
SELECT 
  products.name,
  SUM(orders.quantity) AS total,
  RANK() OVER(ORDER BY SUM(orders.quantity) DESC) as rank
FROM orders
JOIN products ON orders.product_id = products.id
GROUP BY products.name;
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- `RANK() OVER(...)` คือเวทมนตร์ของ SQL ที่ช่วยจัดลำดับให้ทันที! (ถ้ามีคนยอดขายเท่ากัน มันจะให้ได้ที่ 1 ร่วมกันด้วย)
- เราผลักภาระการคำนวณหนักๆ ไปให้ Database (ซึ่งถูกออกแบบมาเพื่อสิ่งนี้) และ Web Server ก็รับข้อมูลที่สำเร็จรูปพร้อมใช้งานไปแสดงผลได้เลย

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้ายอดขายเท่ากัน `RANK()` จะให้ที่ 1 ร่วมกัน 2 คน (1, 1, 3, 4) แต่ถ้าเราอยากให้อันดับมันต่อกันแบบไม่ข้ามเลข (1, 1, 2, 3) เราต้องใช้ฟังก์ชันอะไรแทน? (ลองเสิร์ชหาคำว่า `DENSE_RANK`)
</details>


#### ตัวอย่างโจทย์ 14.2: หายอดขายสะสม (Running Total)

**โค้ด (Junior Level):**
```sql
-- ดึงยอดขายรายวันมาก่อน
SELECT order_date, SUM(quantity) as daily_total
FROM orders
GROUP BY order_date
ORDER BY order_date;
-- แล้วเอาไปคำนวณยอดสะสมใน Excel / Javascript 
```
*(Junior มักจะเอาตัวเลขไปเปิด Excel แล้วสูตร SUM แบบ Running Total เอง)*

**❓ คำถาม**: มีวิธีให้ SQL คำนวณยอดสะสม (Running Total) ให้เสร็จสรรพโดยไม่ต้องพึ่ง Excel หรือ Backend ไหม?

> **💡 คำใบ้**: ลองนึกถึง Window Function ที่มี `OVER(ORDER BY ...)` ซึ่งสามารถ "มองข้ามแถว" เพื่อรวมค่าจากแถวก่อนหน้าได้!

<details>
<summary>🔑 คลิกดูเฉลย (และโค้ดระดับ Senior)</summary>

**โค้ด Senior Level:**
```sql
SELECT 
  order_date,
  SUM(quantity) AS daily_total,
  SUM(SUM(quantity)) OVER(ORDER BY order_date) AS running_total
FROM orders
GROUP BY order_date
ORDER BY order_date;
```
**ทำไมแบบนี้ถึงเป็น Senior?**
- `SUM(...) OVER(ORDER BY order_date)` คือ Window Function ที่สั่ง SQL ให้ "รวมค่าสะสมจากแถวแรกจนถึงแถวปัจจุบัน" 
- ไม่ต้องเอาข้อมูลออกมาทำ Excel หรือเขียนลูปใน Backend!
- ผลลัพธ์พร้อมใช้ทำ Graph เลย

**ผลลัพธ์ตัวอย่าง:**
| order_date | daily_total | running_total |
|---|---|---|
| 2026-08-01 | 3 | 3 |
| 2026-08-02 | 3 | 6 |
| 2026-08-03 | 3 | 9 |
| 2026-08-04 | 1 | 10 |
| 2026-08-05 | 3 | 13 |

---
**🤔 What-If (ลองคิดต่อ...):**
ถ้าเราอยากหา "ค่าเฉลี่ย 3 วันย้อนหลัง" (Moving Average) ของยอดขายแต่ละวัน เราจะเปลี่ยน OVER() ยังไง? (ลองเสิร์ช `ROWS BETWEEN`)
</details>

---

## 🎮 รูปแบบ UI ในแอป (Planned Interaction Flow)

```
┌──────────────────────────────────────────────┐
│  📘 ฝึกอ่านโค้ด SQL                           │
│                                              │
│  ระดับ: 🟢 Lv.1 — SELECT พื้นฐาน      [1/10]  │
│  ──────────────────────────────────          │
│  ┌──────────────────────────────────┐        │
│  │  SELECT name, price             │        │
│  │  FROM products                  │        │
│  │  WHERE is_available = true      │        │
│  │  ORDER BY price DESC            │        │
│  │  LIMIT 3;                       │        │
│  └──────────────────────────────────┘        │
│                                              │
│  📦 ตารางอ้างอิง: [products ▼]               │
│  ┌──────────────────────────────────┐        │
│  │ id | name     | price | avail   │        │
│  │ 1  | อเมริกาโน่ | 65  | true    │        │
│  │ ...                             │        │
│  └──────────────────────────────────┘        │
│                                              │
│  ❓ Query นี้จะได้ผลลัพธ์อะไร?                │
│  ┌──────────────────────────────────┐        │
│  │  พิมพ์คำตอบที่นี่...               │        │
│  └──────────────────────────────────┘        │
│                                              │
│  [📝 ส่งคำตอบ]    [🔑 ดูเฉลย]    [➡️ ข้อถัดไป] │
└──────────────────────────────────────────────┘
```

### ฟีเจอร์ UI เพิ่มเติมสำหรับ SQL:
- **ตารางอ้างอิง (Reference Table)** แสดงข้อมูลตัวอย่างในตารางที่เกี่ยวข้อง (สามารถเปิด-ปิดได้)
- **ER Diagram** แสดงความสัมพันธ์ระหว่างตาราง
- **ผลลัพธ์เฉลย** แสดงเป็นตาราง (Result Table)
- **SQL Syntax Highlighting** สีตามประเภทคำสั่ง (SELECT สีน้ำเงิน, WHERE สีเขียว ฯลฯ)

---

## 📊 สรุปแผนจำนวนโจทย์

| ระดับ | จำนวนโจทย์ (ขั้นต่ำ) | คำสั่งหลัก |
|---|---|---|
| 🟢 Beginner (Lv.1-2) | 4 ข้อ (2 ข้อ/ระดับ) | SELECT, WHERE, LIKE, IN, BETWEEN |
| 🟡 Intermediate (Lv.3-5) | 6 ข้อ (2 ข้อ/ระดับ) | Aggregate, GROUP BY, JOIN |
| 🟠 Advanced (Lv.6-8) | 6 ข้อ (2 ข้อ/ระดับ) | Subquery, DML, DDL |
| 🔴 Challenge (Lv.9-10) | 4 ข้อ (2 ข้อ/ระดับ) | Window Functions, CTE, CASE |
| **รวม** | **20 ข้อขึ้นไป** | |
