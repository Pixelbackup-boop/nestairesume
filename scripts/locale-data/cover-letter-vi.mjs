/**
 * Vietnamese (vi) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-vi.mjs')
 *
 * Primary keyword: "thu xin viec" / "don xin viec" (500/mo each)
 * Related: "mau thu xin viec" (500), "mau don xin viec" (5K)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-vi.mjs';

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Nguyen Minh Tuan',
  authorBio: 'Chuyen gia tu van nghe nghiep va viet thu xin viec voi hon 10 nam kinh nghiem giup nguoi lao dong Viet Nam ghi diem voi nha tuyen dung.',
  titlePattern: (job) => `Thu Xin Viec ${job}: Mau va Huong Dan Viet 2026`,
  descriptionPattern: (job) => `Mau thu xin viec ${job.toLowerCase()} chuyen nghiep voi huong dan chi tiet va vi du thuc te 2026. Tao don xin viec an tuong, tang co hoi phong van, tai mien phi.`,
};

// ─── JOB TITLES (English → Vietnamese) ──────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Nhan vien So sach Ke toan',
  'Corporate Trainer': 'Giang vien Doanh nghiep',
  'Customer Service Representative': 'Nhan vien Dich vu Khach hang',
  'EMT/Paramedic': 'Nhan vien Cap cuu/Cu cap',
  'Frontend Developer': 'Lap trinh vien Frontend',
  'Healthcare Administrator': 'Quan ly Y te',
  'Human Resources Manager': 'Quan ly Nhan su',
  'Machinist': 'Tho may',
  'Registered Nurse': 'Dieu duong',
  'Solutions Architect': 'Kien truc su Giai phap',
  'Systems Administrator': 'Quan tri He thong',
  'Tax Accountant': 'Ke toan Thue',
  'Chief Information Officer': 'Giam doc Cong nghe Thong tin',
  'CNA': 'Tro ly Y ta',
  'Golang Developer': 'Lap trinh vien Golang',
  'LPN': 'Y ta Thuc hanh',
};

// ─── CATEGORIES (English → Vietnamese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Cong nghe',
  Healthcare: 'Y te',
  'Food Service': 'Dich vu An uong',
  Hospitality: 'Khach san',
  Trades: 'Nghe thu cong',
  Creative: 'Sang tao',
  Education: 'Giao duc',
  Marketing: 'Marketing',
  Government: 'Hanh chinh Cong',
  Business: 'Kinh doanh',
  Sales: 'Ban hang',
  Engineering: 'Ky thuat',
  'Business & Finance': 'Kinh doanh va Tai chinh',
  Legal: 'Phap ly',
  HR: 'Nhan su',
  'Skilled Trades': 'Nghe chuyen mon',
  'Real Estate': 'Bat dong san',
  'Customer Service': 'Dich vu Khach hang',
  'Animal Care': 'Cham soc Dong vat',
  Administrative: 'Hanh chinh',
  Transportation: 'Van tai',
  Logistics: 'Logistics',
  Fitness: 'The duc The thao',
  Cleaning: 'Ve sinh',
  Retail: 'Ban le',
  Management: 'Quan ly',
  'Social Services': 'Dich vu Xa hoi',
  Manufacturing: 'San xuat',
  Accounting: 'Ke toan',
  Construction: 'Xay dung',
  Security: 'An ninh',
  Science: 'Khoa hoc',
  'Health & Fitness': 'Suc khoe va The thao',
  Research: 'Nghien cuu',
  Finance: 'Tai chinh',
  'Writing & Content': 'Viet va Noi dung',
  'Supply Chain': 'Chuoi cung ung',
  Quality: 'Chat luong',
  Media: 'Truyen thong',
  Maritime: 'Hang hai',
  'Law Enforcement': 'Luc luong Phap luat',
  Facilities: 'Quan ly Co so',
  Executive: 'Quan ly Cap cao',
  Events: 'Su kien',
  'Entry-Level': 'Moi vao Nghe',
  Entrepreneurship: 'Khoi nghiep',
  Consulting: 'Tu van',
  Childcare: 'Cham soc Tre em',
  'Banking & Finance': 'Ngan hang va Tai chinh',
  Banking: 'Ngan hang',
  Aviation: 'Hang khong',
  Automotive: 'O to',
  Architecture: 'Kien truc',
  Beauty: 'Lam dep',
  Insurance: 'Bao hiem',
  Entertainment: 'Giai tri',
};

// ─── HELPERS ────────────────────────────────────────────────────────────────

function normalizeCategory(category) {
  const c = category.toLowerCase();
  if (c.includes('hospitality') || c.includes('hotel')) return 'Hospitality';
  if (c.includes('tech') || c.includes('software') || c.includes('it')) return 'Technology';
  if (c.includes('engineering')) return 'Engineering';
  if (c.includes('health') || c.includes('medical') || c.includes('nursing')) return 'Healthcare';
  if (c.includes('finance') || c.includes('accounting') || c.includes('banking')) return 'Finance';
  if (c.includes('food') || c.includes('culinary') || c.includes('restaurant')) return 'Food Service';
  if (c.includes('trade') || c.includes('construction') || c.includes('manufacturing') || c.includes('skilled')) return 'Trades';
  if (c.includes('creative') || c.includes('design') || c.includes('art') || c.includes('media') || c.includes('writing')) return 'Creative';
  if (c.includes('education') || c.includes('teaching') || c.includes('childcare')) return 'Education';
  if (c.includes('admin') || c.includes('office') || c.includes('executive') || c.includes('facilities')) return 'Administrative';
  if (c.includes('sales') || c.includes('retail')) return 'Sales';
  if (c.includes('marketing')) return 'Marketing';
  if (c.includes('hr') || c.includes('human resource')) return 'HR';
  if (c.includes('customer') || c.includes('support')) return 'Customer Service';
  if (c.includes('logistics') || c.includes('warehouse') || c.includes('supply') || c.includes('transport')) return 'Logistics';
  if (c.includes('government') || c.includes('law enforcement') || c.includes('security') || c.includes('police')) return 'Government';
  if (c.includes('legal') || c.includes('consulting')) return 'Legal';
  if (c.includes('science') || c.includes('research')) return 'Science';
  if (c.includes('fitness') || c.includes('animal')) return 'Fitness';
  if (c.includes('cleaning')) return 'Cleaning';
  if (c.includes('aviation') || c.includes('automotive') || c.includes('maritime')) return 'Logistics';
  if (c.includes('event') || c.includes('entrepreneurship')) return 'Business';
  if (c.includes('entry')) return 'Entry-Level';
  return 'default';
}

// ─── CATEGORY OPENERS ───────────────────────────────────────────────────────

const CATEGORY_OPENERS = {
  Technology: (job) => `Trong linh vuc cong nghe, thu xin viec ${job} can vuot ra ngoai viec liet ke cac ngon ngu lap trinh va cong cu ban biet. Nha tuyen dung tim kiem ung vien co the chung minh ky nang ky thuat da giai quyet van de thuc te va tao ra gia tri cho cong ty truoc do. Thu cua ban can thiet lap moi lien ket truc tiep giua chuyen mon va nhu cau cu the cua vi tri.`,
  Healthcare: (job) => `Nganh y te dac biet coi trong cam ket voi suc khoe benh nhan. Thu xin viec ${job} can phan anh ca nang luc chuyen mon lan su dong cam nghe nghiep. Nha tuyen dung muon thay ban hieu duoc khia canh dao duc va nhan van cua vai tro, ngoai trinh do ky thuat.`,
  Finance: (job) => `Nha tuyen dung tai chinh va ke toan tim kiem ung vien co thu xin viec the hien tu duy phan tich sac ben va su chinh truc nghe nghiep. Don ung tuyen ${job} cua ban can minh hoa kha nang quan ly trach nhiem tai chinh voi su chinh xac va tuan thu quy dinh nganh.`,
  'Food Service': (job) => `Trong nganh an uong, thu xin viec ${job} can truyen tai niem dam me am thuc va kha nang lam viec hieu qua trong moi truong nhip do cao. Nha tuyen dung danh gia cao ung vien the hien tinh than lam viec nhom, hieu biet ve tieu chuan ve sinh va cam ket voi trai nghiem khach hang.`,
  Hospitality: (job) => `Nganh khach san danh gia cao ung vien the hien su xuat sac trong phuc vu. Thu xin viec ${job} can phan anh tinh than hieu khach, su chu dao va kha nang tao trai nghiem dang nho cho khach hang. Nha tuyen dung tim kiem chuyen gia ket hop ky nang van hanh va su am ap trong giao tiep.`,
  Trades: (job) => `Doi voi cac nghe ky thuat va thu cong, thu xin viec ${job} hieu qua can lam noi bat kinh nghiem thuc hanh, chung chi va cam ket voi an toan lao dong. Nha tuyen dung tim kiem nguoi dang tin cay, tu chu va co the dam bao chat luong cong viec dung tien do.`,
  Engineering: (job) => `Cac vi tri ky thuat can thu xin viec ${job} the hien kha nang giai quyet van de phuc tap mot cach co he thong. Nha tuyen dung muon thay bang chung cu the ve du an hoan thanh, su thanh thao cong cu ky thuat va hieu biet ve cac rang buoc trong nganh.`,
  Creative: (job) => `Trong cac nghe sang tao, thu xin viec ${job} chinh la mot vi du ve tai nang cua ban. No can the hien su nhay cam nghe thuat dong thoi chung minh su hieu biet ve muc tieu kinh doanh. Giam doc sang tao tim kiem ung vien co the dung hoa tam nhin nghe thuat voi nhu cau khach hang.`,
  Education: (job) => `Nganh giao duc danh gia cao ung vien the hien su tan tam chan thanh voi viec truyen thu kien thuc. Thu xin viec ${job} can phan anh triet ly giao duc, kha nang thich ung voi cac doi tuong hoc sinh khac nhau va cam ket vi su thanh cong cua nguoi hoc.`,
  Administrative: (job) => `Cac vi tri hanh chinh can thu xin viec ${job} minh hoa kha nang to chuc, su kin dao va tinh da nang. Nha tuyen dung tim kiem ung vien co the du doan nhu cau, quan ly nhieu uu tien cung luc va dam bao hoat dong van phong dien ra tron tru.`,
  Sales: (job) => `Thu xin viec ${job} chinh la buoi chao hang dau tien cua ban: no phai thuyet phuc. Nha tuyen dung danh gia kha nang giao tiep thuyet phuc, nhan dien nhu cau khach hang va trinh bay gia tri mot cach ro rang. Moi doan van can minh hoa tiem nang kinh doanh cua ban.`,
  Marketing: (job) => `Trong marketing, thu xin viec ${job} can phan anh su hieu biet ve chien luoc truyen thong va kha nang tao ket qua do luong duoc. Nha tuyen dung muon thay ban thanh thao ca tu duy chien luoc lan thuc thi, voi vi du cu the ve cac chien dich thanh cong.`,
  HR: (job) => `Cac vi tri nhan su can thu xin viec ${job} the hien su hieu biet ve dong luc to chuc va su nhay cam voi cac van de con nguoi trong doanh nghiep. Don ung tuyen can minh hoa kha nang can bang loi ich cua nhan vien va to chuc.`,
  'Customer Service': (job) => `Cac vi tri dich vu khach hang can thu xin viec ${job} lam noi bat kha nang lang nghe, su kien nhan va tai nang giai quyet van de. Nha tuyen dung tim kiem ung vien co the bien tinh huong kho khan thanh trai nghiem tich cuc cho khach hang.`,
  Logistics: (job) => `Nganh logistics danh gia cao su chinh xac va hieu qua van hanh. Thu xin viec ${job} can chung minh kha nang quan ly cac hoat dong phuc tap, dam bao tien do va toi uu hoa quy trinh. Nha tuyen dung tim kiem chuyen gia co phuong phap va kinh nghiem quan ly chuoi cung ung.`,
  Government: (job) => `Ung tuyen vao khu vuc cong tuan theo cac quy uoc rieng. Thu xin viec ${job} can the hien cam ket voi dich vu cong, hieu biet khung phap ly va kha nang lam viec trong khuon kho thu tuc hanh chinh.`,
  Legal: (job) => `Nganh phap ly doi hoi thu xin viec ${job} hoan hao ca ve hinh thuc va noi dung. Nha tuyen dung danh gia tu duy logic, kha nang phan tich va su am hieu thuat ngu phap ly. Moi cau phai phan anh su chinh xac va chu y den chi tiet ma nghe nghiep doi hoi.`,
  Science: (job) => `Cac vi tri khoa hoc can thu xin viec ${job} lam noi bat phuong phap tiep can phan tich va dong gop nghien cuu cua ban. Nha tuyen dung muon thay bang chung ve su nghiem tuc trong phuong phap, cac cong bo hoac du an y nghia va kha nang giai thich cac khai niem phuc tap.`,
  Fitness: (job) => `Trong linh vuc the thao va suc khoe, thu xin viec ${job} can truyen tai niem dam me voi su dong hanh va nang luc chuyen mon. Nha tuyen dung tim kiem chuyen gia co chung chi the hien cam ket chan thanh voi suc khoe va su tien bo cua khach hang.`,
  Cleaning: (job) => `Doi voi cac vi tri ve sinh, thu xin viec ${job} hieu qua can lam noi bat su dang tin cay, su chu y chi tiet va kien thuc ve san pham cung ky thuat ve sinh chuyen nghiep. Nha tuyen dung uu tien ung vien dung gio, tu chu va chu trong duy tri tieu chuan ve sinh cao.`,
  'Entry-Level': (job) => `Doi voi nguoi moi di lam, thu xin viec ${job} can bu dap cho viec thieu kinh nghiem bang su nhiet huyet, dong luc va cac ky nang co the chuyen doi tu truong hoc hoac thuc tap. Nha tuyen dung danh gia cao ung vien the hien tiem nang hoc hoi nhanh va mong muon dong gop that su.`,
  Business: (job) => `Moi truong kinh doanh can thu xin viec ${job} the hien tu duy chien luoc va dinh huong ket qua. Nha tuyen dung tim kiem ung vien co the dong gop vao su tang truong cua doanh nghiep, voi su hieu biet ro rang ve thach thuc thuong mai va kha nang de xuat giai phap cu the.`,
  default: (job) => `Thu xin viec ${job} hieu qua thiet lap moi lien ket truc tiep giua ky nang cua ban va nhu cau cu the cua doanh nghiep. No the hien su hieu biet ve vai tro, lam noi bat thanh tich phu hop nhat va truyen tai dong luc chan thanh cho co hoi nghe nghiep nay.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `thu xin viec ${lower}`,
    `mau thu xin viec ${lower}`,
    `don xin viec ${lower}`,
    `mau don xin viec chuyen nghiep`,
    `cach viet thu xin viec`,
    `don ung tuyen ${lower}`,
    `thu xin viec 2026`,
    `mau don xin viec mien phi`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Cach viet thu xin viec cho vi tri ${lower} nhu the nao?`,
      answer: `Bat dau bang phan mo dau ca nhan hoa, nhac den ten cong ty va vi tri mong muon. Sau do trinh bay hai den ba thanh tich cu the phu hop voi yeu cau cua vi tri ${lower}, su dung con so va ket qua do luong duoc. Ket thuc bang loi ket the hien dong luc va de nghi phong van.`,
    },
    {
      question: `Thu xin viec cho vi tri ${lower} nen dai bao nhieu?`,
      answer: `Thu xin viec cho vi tri ${lower} nen goi gon trong mot trang, khoang 250-400 tu. Nha tuyen dung danh it thoi gian cho moi ho so, vi vay hay uu tien su ngan gon va tac dong. Moi doan phai cung cap thong tin moi va phu hop voi vi tri.`,
    },
    {
      question: `Co nen lap lai noi dung CV trong thu xin viec cho vi tri ${lower} khong?`,
      answer: `Khong, thu xin viec khong nen lap lai CV. Thu can bo sung cho CV bang cach them boi canh, giai thich dong luc va phat trien cac thanh tich phu hop nhat voi vi tri ${lower}. Hay dung thu de ke cau chuyen dang sau nhung con so va the hien ca tinh nghe nghiep.`,
    },
    {
      question: `Co luon can gui thu xin viec khi ung tuyen vi tri ${lower} khong?`,
      answer: `Ngay ca khi tin tuyen dung khong yeu cau ro rang, mot thu xin viec viet tot cho vi tri ${lower} co the tao ra su khac biet giua hai ung vien co nang luc tuong duong. No the hien su nghiem tuc, su quan tam that su den vi tri va kha nang giao tiep chuyen nghiep cua ban.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'cac ky nang cot loi cua vi tri';
  const skill1 = skills[0] || 'quan ly du an';
  const skill2 = skills[1] || 'lam viec nhom';
  const skill3 = skills[2] || 'giao tiep';
  const skill4 = skills[3] || 'giai quyet van de';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);

  return `
## Cach Viet Thu Xin Viec ${jobTitle}

${opener}

Mot thu xin viec thuyet phuc cho vi tri ${lower} khong chi don gian tom tat qua trinh lam viec. No chung minh ban da danh thoi gian tim hieu nhu cau cua vai tro va doanh nghiep, dong thoi so huu nhung ky nang cu the de dap ung. Day la co hoi de ban the hien ca tinh nghe nghiep va tao su khac biet voi cac ung vien khac.

## Mau Thu Xin Viec ${jobTitle}

> **Tieu de: Ung tuyen vi tri ${jobTitle} — Ma tuyen dung: [Ma tin tuyen dung]**
>
> Kinh gui Phong Nhan su,
>
> Tin tuyen dung vi tri ${lower} dang tren [Nguon dang tin] da thu hut su chu y cua toi. Voi kinh nghiem trong ${skill1} va ${skill2}, toi tin rang minh co the dong gop gia tri cho [Ten Cong ty].
>
> Tai [Cong ty hien tai/Truoc do], toi da phat trien chuyen mon vung chac trong ${topSkills}. Mot trong nhung thanh tich noi bat nhat cua toi la [vi du thanh tich cu the lien quan den ${skill1}], giup cai thien ket qua cua doi nhom mot cach ro rang. Su thanh thao ${skill3} cung giup toi [vi du dong gop lien quan den ${skill3}].
>
> Dieu khien toi dac biet quan tam den vi tri nay tai [Ten Cong ty] la [ly do cu the lien quan den cong ty hoac vai tro]. Toi tin rang ky nang ${skill4} va kinh nghiem trong nganh se giup toi dong gop hieu qua vao muc tieu cua quy cong ty.
>
> Toi rat mong duoc trao doi them ve ho so ung tuyen cua minh trong buoi phong van va trinh bay chi tiet hon cach ma kinh nghiem cua toi co the dap ung nhu cau cua quy cong ty. Toi san sang gap mat bat cu khi nao thuan tien.
>
> Tran trong,
>
> [Ho va Ten]

*Hay thay the cac phan trong dau ngoac vuong bang thong tin ca nhan va thong tin cong ty ban ung tuyen.*

## Cac Yeu To Then Chot Cua Thu Xin Viec Hieu Qua

### Phan Mo Dau Ca Nhan Hoa

Tranh nhung cau mo dau chung chung nhu "Kinh gui quy cong ty, toi xin gui don ung tuyen". Hay nhac den ten cong ty, ma tuyen dung va mot ly do cu the giai thich vi sao ban quan tam. Nha tuyen dung se nhan ra ngay neu phan mo dau la ban sao gui cho nhieu cong ty. Hay nhac den mot du an gan day cua cong ty, mot bai bao hoac gia tri phu hop voi hanh trinh ${lower} cua ban.

### Thanh Tich Co Con So Cu The

Moi khang dinh can duoc ho tro boi du lieu cu the. Thay vi viet "toi da cai thien quy trinh", hay viet "toi da giam 30% thoi gian xu ly bang cach trien khai phuong phap moi trong ${skill1}". Thanh tich do luong duoc mang lai su dang tin cay cho don ung tuyen va giup nha tuyen dung danh gia tac dong thuc te cua ban khi lam ${lower}.

### Ket Noi Voi Doanh Nghiep

Chung minh ban da nghien cuu ky ve cong ty. Xac dinh mot thach thuc hoac muc tieu chien luoc ma ban co the dong gop nho ky nang trong ${topSkills}. Phan nay chung minh don ung tuyen cua ban la co muc tieu va can nhac, khong don gian la gui dai. Nha tuyen dung danh gia cao ung vien hieu boi canh cua ho truoc ca buoi phong van dau tien.

### Ket Thuc Voi Gia Tri Cu The

Phan ket thuc khong nen chi la loi chao xa giao. Hay tom tat trong mot cau dong gop dac biet cua ban va de nghi cu the mot buoi phong van. Khang dinh lai su nhiet huyet voi vi tri ${lower} va cho biet kha nang sap xep cua ban. Mot ket thuc manh me tao an tuong sau va thuc day nha tuyen dung lien he voi ban.

## Loi Khuyen Theo Cap Do Kinh Nghiem

### Sinh Vien Moi Ra Truong

Khi chua co kinh nghiem lam viec dang ke, hay tap trung vao thuc tap, du an hoc thuat va ky nang co the chuyen doi. Giai thich cach dao tao da chuan bi ban cho vai tro ${lower}. Lam noi bat dong luc, kha nang hoc hoi nhanh va cac hoat dong ngoai khoa lien quan. Nha tuyen dung hieu ban moi bat dau — ho tim kiem tiem nang, khong phai thanh tich day du.

### Chuyen Gia Co Kinh Nghiem

Voi nhieu nam kinh nghiem, hay chon hai den ba thanh tich phu hop nhat voi vi tri ${lower} mong muon. Dung co gang bao quat tat ca: tap trung vao nhung ket qua chung minh gia tri gia tang cua ban tot nhat. The hien su phat trien nghe nghiep va kha nang dam nhan trach nhiem ngay cang lon. Con so va vi du cu the la dong minh tot nhat cua ban.

### Lanh Dao Cap Cao

O cap do nay, thu xin viec cho vi tri ${lower} can phan anh tam nhin chien luoc va kha nang dan dat doi nhom cung du an quy mo lon. Lam noi bat thanh tich cap doanh nghiep: chuyen doi thanh cong, tiet kiem chi phi, xay dung doi nhom. Su dung giong van tu tin nhung de tiep can, va cho thay ban hieu ca thach thuc van hanh lan chien luoc cua vai tro.

## Nhung Sai Lam Thuong Gap Trong Thu Xin Viec

- **Gui thu chung khong ca nhan hoa** — Nha tuyen dung nhan ra ngay mot thu mau gui hang loat. Moi don ung tuyen cho vi tri ${lower} xung dang co mot thu duoc tuy chinh, nhac den cong ty, vi tri va ly do cu the cua su quan tam.

- **Lap lai CV tu dau den cuoi** — Thu xin viec can bo sung cho CV, khong sao chep no. Hay dung thu de phat trien boi canh thanh tich, giai thich cac buoc ngoat nghe nghiep va truyen tai ca tinh nghe nghiep cua ban.

- **Bat dau moi cau bang "Toi"** — Mot thu chi tap trung vao ban than thieu goc nhin. Hay xen ke giua nhung gi ban mang lai va nhung gi doanh nghiep can. Cho thay ban hieu nhu cau cua vi tri ${lower} va cach ban dap ung.

- **Bo qua hinh thuc va chinh ta** — Thu xin viec co loi chinh ta hoac trinh bay lun xun gui di tin hieu tieu cuc ve su chuyen nghiep cua ban. Doc lai ky va nho mot nguoi khac kiem tra truoc khi gui.

- **Quen loi keu goi hanh dong cuoi thu** — Ket thuc ma khong de nghi buoc tiep theo cu the (phong van, cuoc goi, kha nang gap mat) khien nha tuyen dung khong co huong di. Luon ket thuc bang de nghi ro rang va bieu thi kha nang sap xep cua ban.

## Hoan Thien Ho So Voi CV Chuyen Nghiep

Mot thu xin viec hieu qua xung dang di kem mot CV xuat sac. Dam bao ho so ung tuyen ${lower} cua ban nhat quan tu dau den cuoi:

- [Tao CV chuyen nghiep](/vi/builder) voi cong cu mien phi, truc quan va toi uu ATS cua chung toi
- [Tham khao mau CV ${lower}](/vi/resume-examples/${slug}) de lay cam hung tu cac mau phù hop voi nganh cua ban
- [Tao thu xin viec tu dong](/vi/tools/cover-letter) voi tro ly AI giup tuy chinh noi dung theo ho so cua ban

Mot ho so ung tuyen hoan chinh va nhat quan — CV duoc cham chut, thu xin viec duoc ca nhan hoa — tang dang ke co hoi duoc phong van cho vi tri ${lower} mong muon.
`;
}
