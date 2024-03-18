# سیستم رزرو هتل

سعی کردیم یک سیستمی طراحی کنیم که علاوه بر راحت بودن استفاده ازش بسیار بهینه باشه و شما بتونید هر قالبی که خواستید برای اون بسازید و در رزومه خود قرار دهید

### احراز هویت 🔒

در این بخش تمام ادرس هایی که برای احراز هویت نیاز دارید توضیح داده شده است

#### ثبت نام و ورود 🔑

در ابتدا شما از کاربر شماره موبایل او رو دریافت میکنید و با استفاده از این مسیر یک کد تایید برای اون میفرستید

```http
  GET /auth/send-otp
```

اطلاعاتی که باید ارسال کنید
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `mobile` | `string` | شماره تلفن کاربر |

پاسخی که از سرور دریافت میکنید اینجوری است:

```json
{
  "code": "92480",
  "message": "کد ارسال شد"
}
```

سپس با استفاده از این ادرس کد ارسال شده رو چک میکنید:

```http
  GET /auth/check-otp
```

| Parameter | Type     | Description      |
| :-------- | :------- | :--------------- |
| `mobile`  | `string` | شماره تلفن کاربر |
| `code`    | `string` | کد ارسال شده     |

در صورت درست بودن کد یک توکن به شما داده میشود که برای درخواست های بعدی به اون نیاز دارید ( به طور خودکار توکن داخل کوکی ذخیره خواهد شد)

```json
{
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTEyNzAwNDQxMCIsImlkIjoiNjVkMmZmNjkxNmNkNGM5ODgyMTRkMWJhIiwiaWF0IjoxNzEwNjE0ODkzLCJleHAiOjE3MTA3MDEyOTN9.0zyN-KaBX5s7dnontmHwKDKZ_wVKhaY7UHKOg_hQlPw",
  "message": "ورود با موفیقت انجام شد"
}
```

### هتل

در این بخش تمام ادرس هایی که برای اطلاعات هتل ها نیاز دارید توضیح داده شده است

#### دریافت اطلاعات هتل

برای نمایش لیست تمام هتل های موجود کافیست به این ادرس درخواست دهید

```http
  GET /hotel
```

برای نمایش اطلاعات کامل تر یک هتل خاص کافیست ایدی آن هتل را ارسال کنید

```http
  GET /hotel/:id
```

#### اضافه کردن یک هتل

برای اصافه کردن یک هتل باید مثادیر مورد نیاز رو به این ادرس ارسال کنید:

```http
  POST /hotel/add
```

| Parameter  | Type       | Required | Description                                                     |
| :--------- | :--------- | :------- | :-------------------------------------------------------------- |
| `name`     | `string`   | ✔️       | نام                                                             |
| `address`  | `string`   | ✔️       | آدرس                                                            |
| `phone`    | `string`   | ✔️       | شماره تلفن                                                      |
| `email`    | `string`   |          | ایمیل                                                           |
| `website`  | `string`   |          | وب‌سایت                                                         |
| `rates`    | `number`   |          | امتیاز (مقادیر مجاز: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5) |
| `price`    | `number`   | ✔️       | قیمت                                                            |
| `services` | `[string]` |          | خدمات                                                           |
| `images`   | `[string]` |          | تصاویر                                                          |

مثال:

```json
{
  "name": "هتل آرامیس",
  "address": "خیابان چهاردهم، شماره 123، تهران، ایران",
  "phone": "+982112345678",
  "email": "info@hotel14.com",
  "website": "http://www.hotel14.com",
  "rates": 4.5,
  "price": 150000,
  "services": ["صبحانه رایگان", "اینترنت وای فای", "پارکینگ رایگان"],
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"]
}
```

#### حذف یک هتل

از این ادرس برای حذف یک هتل میتوان استفاده کرد:

```http
  DELETE /hotel/remove/:id
```

آیدی هتل مورد نظر را ارسال کنید
