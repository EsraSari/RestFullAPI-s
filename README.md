Restful API Projesi
Bu proje, bir müşteri ve adres yönetimi için RESTful API sunmaktadır. Mongoose ve Express.js kullanarak oluşturulmuş bir Node.js uygulamasıdır. MongoDB veritabanında müşteri ve adres bilgilerini yönetmek için çeşitli uç noktalar (endpoints) sağlamaktadır.

Teknolojiler
Node.js: Sunucu tarafında JavaScript çalıştırmak için.
Express.js: RESTful API geliştirmek için kullanılan bir web çerçevesi.
MongoDB: Veritabanı yönetimi için NoSQL veritabanı.
Mongoose: MongoDB ile etkileşimde bulunmak için kullanılan bir ODM (Object Data Modeling) kütüphanesi.
Axios: HTTP istekleri için kullanılan bir kütüphane (ön yüz uygulamalarında).
API Uç Noktaları
Müşteri (Customer) İşlemleri
Müşteri Oluşturma

POST /customer
Body: { "userName": "kullanıcı adı", "email": "email@example.com", "password": "şifre" }
Müşteri Güncelleme

PUT /customer/update/:id
Body: { "userName": "yeni kullanıcı adı", "email": "yeni_email@example.com", "password": "yeni şifre" }
Müşteri Silme

DELETE /customer/delete/:id
Müşteri Bilgisi Getirme

GET /customer/:id
Adres (Address) İşlemleri
Adres Oluşturma

POST /address/create
Body: { "customerId": "müşteri_id", "street": "sokak adı", "city": "şehir adı", "state": "eyalet", "zip": "posta kodu" }
Adres Güncelleme

PUT /address/:id
Body: { "street": "yeni sokak adı", "city": "yeni şehir adı", "state": "yeni eyalet", "zip": "yeni posta kodu" }
Adres Silme

DELETE /address/:id
Tüm Adresleri Getirme

GET /address/addresses
ID ile Adres Getirme

GET /address/getAddressById/:id

