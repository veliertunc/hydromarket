export type Product = { id:string; name:string; category:string; brand:string; description:string; price:number; image:string; tag?:string };
export const categories = ["Hidrolik Pompalar","Hidrolik Motorlar","Hidrolik Valfler","Hidrolik Hortumlar","Yüksek Basınç","Filtreler","Hidrolik Kumanda Valfleri","Aksesuarlar"];
export const products: Product[] = [
 {id:"p1",name:"05P Serisi Dişli Pompa",category:"Hidrolik Pompalar",brand:"HEMA",description:"Kompakt gövde, yüksek verim ve uzun çalışma ömrü.",price:12850,image:"pump",tag:"Çok satan"},
 {id:"p2",name:"1MN Serisi Dişli Motor",category:"Hidrolik Motorlar",brand:"HEMA",description:"Endüstriyel uygulamalar için güçlü ve güvenilir motor.",price:9740,image:"motor",tag:"Yeni"},
 {id:"p3",name:"-35°C Özel Basınç Valfi",category:"Hidrolik Valfler",brand:"OILCOMP",description:"Zorlu iklim koşullarında hassas basınç kontrolü.",price:6850,image:"valve",tag:"Yeni"},
 {id:"p4",name:"1SN Tek Telli Hidrolik Hortum",category:"Hidrolik Hortumlar",brand:"ALFAGOMMA",description:"Yüksek dayanımlı, esnek tek telli hortum.",price:890,image:"hose"},
 {id:"p5",name:"1000 Bar Ultra Yüksek Basınç Kaplin",category:"Yüksek Basınç",brand:"FERRO",description:"Güvenli bağlantı için hassas işlenmiş hızlı kaplin.",price:4250,image:"coupling",tag:"Profesyonel"},
 {id:"p6",name:"Eksenel Pistonlu Hidrolik Pompa",category:"Hidrolik Pompalar",brand:"DANFOSS",description:"Ağır hizmet tipi makinelerde kararlı akış performansı.",price:24300,image:"pump2"},
 {id:"p7",name:"Yön Kontrol Valfi 4/3",category:"Hidrolik Valfler",brand:"WALVOIL",description:"Hassas yön kontrolü ve düşük basınç kaybı.",price:5320,image:"valve2"},
 {id:"p8",name:"Yüksek Basınç Filtresi",category:"Filtreler",brand:"MP FILTRI",description:"Hidrolik sistemleriniz için temiz ve güvenilir akış.",price:2180,image:"filter"},
 {id:"p9",name:"1PA Konik Milli Dişli Pompa",category:"Hidrolik Pompalar",brand:"HEMA",description:"Konik mil bağlantısıyla kolay montaj ve bakım.",price:11300,image:"pump3"},
 {id:"p10",name:"Monoblok Kumanda Valfi",category:"Hidrolik Kumanda Valfleri",brand:"WALVOIL",description:"Kompakt tasarım, çok fonksiyonlu kontrol.",price:7860,image:"valve3"},
 {id:"p11",name:"Hidrolik Akümülatör 2.5L",category:"Aksesuarlar",brand:"OLAER",description:"Basınç dalgalanmalarını dengeleyen azot akümülatörü.",price:6190,image:"filter2"},
 {id:"p12",name:"Çelik Hızlı Bağlantı Seti",category:"Aksesuarlar",brand:"FERRARI",description:"Sızdırmaz, hızlı ve güvenli hat bağlantısı.",price:1450,image:"coupling2"}
];
export const formatPrice = (price:number) => new Intl.NumberFormat("tr-TR",{style:"currency",currency:"TRY",maximumFractionDigits:0}).format(price);
