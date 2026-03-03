/**
 * Vietnamese (vi) locale data for cover letter example generation.
 * Imported by generate-locale-cover-letters.mjs via:
 *   await import('./locale-data/cover-letter-vi.mjs')
 *
 * Primary keyword: "thu xin viec" / "don xin viec" (500/mo each)
 * Related: "mau thu xin viec" (500), "mau don xin viec" (5K)
 */

import { JOB_TITLES as RESUME_TITLES } from './resume-vi.mjs';

const CATEGORY_COMPANIES = {
  Technology: 'FPT Software, Viettel, VNG, Shopee Vietnam, Tiki, Samsung Vietnam',
  Healthcare: 'Vinmec, FV Hospital, Bệnh viện Chợ Rẫy, Bệnh viện Bạch Mai, Medlatec',
  Finance: 'Techcombank, VPBank, MB Bank, Vietcombank, Manulife Vietnam',
  Education: 'Đại học FPT, Vinschool, RMIT Vietnam, British International School',
  'Food Service': "Golden Gate, The Coffee House, Highlands Coffee, Pizza 4P's",
  Hospitality: 'Vinpearl, Mường Thanh, InterContinental Đà Nẵng, JW Marriott Phú Quốc',
  Trades: 'Hòa Phát, Coteccons, Viglacera, Samsung Vietnam, Canon Vietnam',
  Creative: 'VNG Games, Gameloft Vietnam, Dentsu Vietnam, Leo Burnett Vietnam',
  Administrative: 'Vingroup, Masan Group, TH True Milk, Novaland, Sun Group',
  Sales: 'Thế Giới Di Động, FPT Shop, Bách Hóa Xanh, Điện Máy Xanh',
  Marketing: 'VNG, Lazada Vietnam, Shopee Vietnam, Grab Vietnam, VinID',
  HR: 'Navigos Group, ManpowerGroup Vietnam, Adecco Vietnam',
  'Customer Service': 'Viettel, VNPT, MobiFone, FPT Telecom, VinFast',
  Retail: 'Thế Giới Di Động, Bách Hóa Xanh, AEON Vietnam, Lotte Mart',
  Logistics: 'Viettel Post, Giao Hàng Nhanh, J&T Express, Gemadept',
  Government: 'các cơ quan nhà nước, UBND, Sở ban ngành',
  Legal: 'VILAF, Rajah & Tann LCT, Baker McKenzie Vietnam',
  default: 'các doanh nghiệp hàng đầu Việt Nam',
};

// ─── CONFIG ─────────────────────────────────────────────────────────────────

export const CONFIG = {
  author: 'Nguyễn Minh Tuấn',
  authorBio: 'Chuyên gia tư vấn nghề nghiệp và viết thư xin việc với hơn 10 năm kinh nghiệm giúp người lao động Việt Nam ghi điểm với nhà tuyển dụng.',
  titlePattern: (job) => `Thư Xin Việc ${job}: Mẫu và Hướng Dẫn Viết 2026`,
  descriptionPattern: (job) => `Mẫu thư xin việc ${job.toLowerCase()} chuyên nghiệp với hướng dẫn chi tiết và ví dụ thực tế 2026. Tạo đơn xin việc ấn tượng, tăng cơ hội phỏng vấn, tải miễn phí.`,
};

// ─── JOB TITLES (English → Vietnamese) ──────────────────────────────────────

export const JOB_TITLES = {
  ...RESUME_TITLES,
  'Bookkeeper': 'Nhân viên Sổ sách Kế toán',
  'Corporate Trainer': 'Giảng viên Doanh nghiệp',
  'Customer Service Representative': 'Nhân viên Dịch vụ Khách hàng',
  'EMT/Paramedic': 'Nhân viên Cấp cứu/Cứu cấp',
  'Frontend Developer': 'Lập trình viên Frontend',
  'Healthcare Administrator': 'Quản lý Y tế',
  'Human Resources Manager': 'Quản lý Nhân sự',
  'Machinist': 'Thợ máy',
  'Registered Nurse': 'Điều dưỡng',
  'Solutions Architect': 'Kiến trúc sư Giải pháp',
  'Systems Administrator': 'Quản trị Hệ thống',
  'Tax Accountant': 'Kế toán Thuế',
  'Chief Information Officer': 'Giám đốc Công nghệ Thông tin',
  'CNA': 'Trợ lý Y tá',
  'Golang Developer': 'Lập trình viên Golang',
  'LPN': 'Y tá Thực hành',
};

// ─── CATEGORIES (English → Vietnamese) ──────────────────────────────────────

export const CATEGORIES = {
  Technology: 'Công nghệ',
  Healthcare: 'Y tế',
  'Food Service': 'Dịch vụ Ăn uống',
  Hospitality: 'Khách sạn',
  Trades: 'Nghề thủ công',
  Creative: 'Sáng tạo',
  Education: 'Giáo dục',
  Marketing: 'Marketing',
  Government: 'Hành chính Công',
  Business: 'Kinh doanh',
  Sales: 'Bán hàng',
  Engineering: 'Kỹ thuật',
  'Business & Finance': 'Kinh doanh và Tài chính',
  Legal: 'Pháp lý',
  HR: 'Nhân sự',
  'Skilled Trades': 'Nghề chuyên môn',
  'Real Estate': 'Bất động sản',
  'Customer Service': 'Dịch vụ Khách hàng',
  'Animal Care': 'Chăm sóc Động vật',
  Administrative: 'Hành chính',
  Transportation: 'Vận tải',
  Logistics: 'Logistics',
  Fitness: 'Thể dục Thể thao',
  Cleaning: 'Vệ sinh',
  Retail: 'Bán lẻ',
  Management: 'Quản lý',
  'Social Services': 'Dịch vụ Xã hội',
  Manufacturing: 'Sản xuất',
  Accounting: 'Kế toán',
  Construction: 'Xây dựng',
  Security: 'An ninh',
  Science: 'Khoa học',
  'Health & Fitness': 'Sức khỏe và Thể thao',
  Research: 'Nghiên cứu',
  Finance: 'Tài chính',
  'Writing & Content': 'Viết và Nội dung',
  'Supply Chain': 'Chuỗi cung ứng',
  Quality: 'Chất lượng',
  Media: 'Truyền thông',
  Maritime: 'Hàng hải',
  'Law Enforcement': 'Lực lượng Pháp luật',
  Facilities: 'Quản lý Cơ sở',
  Executive: 'Quản lý Cao cấp',
  Events: 'Sự kiện',
  'Entry-Level': 'Mới vào Nghề',
  Entrepreneurship: 'Khởi nghiệp',
  Consulting: 'Tư vấn',
  Childcare: 'Chăm sóc Trẻ em',
  'Banking & Finance': 'Ngân hàng và Tài chính',
  Banking: 'Ngân hàng',
  Aviation: 'Hàng không',
  Automotive: 'Ô tô',
  Architecture: 'Kiến trúc',
  Beauty: 'Làm đẹp',
  Insurance: 'Bảo hiểm',
  Entertainment: 'Giải trí',
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
  Technology: (job) => `Trong lĩnh vực công nghệ, thư xin việc ${job} cần vượt ra ngoài việc liệt kê các ngôn ngữ lập trình và công cụ bạn biết. Nhà tuyển dụng tìm kiếm ứng viên có thể chứng minh kỹ năng kỹ thuật đã giải quyết vấn đề thực tế và tạo ra giá trị cho công ty trước đó. Thư của bạn cần thiết lập mối liên kết trực tiếp giữa chuyên môn và nhu cầu cụ thể của vị trí.`,
  Healthcare: (job) => `Ngành y tế đặc biệt coi trọng cam kết với sức khỏe bệnh nhân. Thư xin việc ${job} cần phản ánh cả năng lực chuyên môn lẫn sự đồng cảm nghề nghiệp. Nhà tuyển dụng muốn thấy bạn hiểu được khía cạnh đạo đức và nhân văn của vai trò, ngoài trình độ kỹ thuật.`,
  Finance: (job) => `Nhà tuyển dụng tài chính và kế toán tìm kiếm ứng viên có thư xin việc thể hiện tư duy phân tích sắc bén và sự chính trực nghề nghiệp. Đơn ứng tuyển ${job} của bạn cần minh họa khả năng quản lý trách nhiệm tài chính với sự chính xác và tuân thủ quy định ngành.`,
  'Food Service': (job) => `Trong ngành ăn uống, thư xin việc ${job} cần truyền tải niềm đam mê ẩm thực và khả năng làm việc hiệu quả trong môi trường nhịp độ cao. Nhà tuyển dụng đánh giá cao ứng viên thể hiện tinh thần làm việc nhóm, hiểu biết về tiêu chuẩn vệ sinh và cam kết với trải nghiệm khách hàng.`,
  Hospitality: (job) => `Ngành khách sạn đánh giá cao ứng viên thể hiện sự xuất sắc trong phục vụ. Thư xin việc ${job} cần phản ánh tinh thần hiếu khách, sự chu đáo và khả năng tạo trải nghiệm đáng nhớ cho khách hàng. Nhà tuyển dụng tìm kiếm chuyên gia kết hợp kỹ năng vận hành và sự ấm áp trong giao tiếp.`,
  Trades: (job) => `Đối với các nghề kỹ thuật và thủ công, thư xin việc ${job} hiệu quả cần làm nổi bật kinh nghiệm thực hành, chứng chỉ và cam kết với an toàn lao động. Nhà tuyển dụng tìm kiếm người đáng tin cậy, tự chủ và có thể đảm bảo chất lượng công việc đúng tiến độ.`,
  Engineering: (job) => `Các vị trí kỹ thuật cần thư xin việc ${job} thể hiện khả năng giải quyết vấn đề phức tạp một cách có hệ thống. Nhà tuyển dụng muốn thấy bằng chứng cụ thể về dự án hoàn thành, sự thành thạo công cụ kỹ thuật và hiểu biết về các ràng buộc trong ngành.`,
  Creative: (job) => `Trong các nghề sáng tạo, thư xin việc ${job} chính là một ví dụ về tài năng của bạn. Nó cần thể hiện sự nhạy cảm nghệ thuật đồng thời chứng minh sự hiểu biết về mục tiêu kinh doanh. Giám đốc sáng tạo tìm kiếm ứng viên có thể dung hòa tầm nhìn nghệ thuật với nhu cầu khách hàng.`,
  Education: (job) => `Ngành giáo dục đánh giá cao ứng viên thể hiện sự tận tâm chân thành với việc truyền thụ kiến thức. Thư xin việc ${job} cần phản ánh triết lý giáo dục, khả năng thích ứng với các đối tượng học sinh khác nhau và cam kết vì sự thành công của người học.`,
  Administrative: (job) => `Các vị trí hành chính cần thư xin việc ${job} minh họa khả năng tổ chức, sự kín đáo và tính đa năng. Nhà tuyển dụng tìm kiếm ứng viên có thể dự đoán nhu cầu, quản lý nhiều ưu tiên cùng lúc và đảm bảo hoạt động văn phòng diễn ra trôi tru.`,
  Sales: (job) => `Thư xin việc ${job} chính là buổi chào hàng đầu tiên của bạn: nó phải thuyết phục. Nhà tuyển dụng đánh giá khả năng giao tiếp thuyết phục, nhận diện nhu cầu khách hàng và trình bày giá trị một cách rõ ràng. Mỗi đoạn văn cần minh họa tiềm năng kinh doanh của bạn.`,
  Marketing: (job) => `Trong marketing, thư xin việc ${job} cần phản ánh sự hiểu biết về chiến lược truyền thông và khả năng tạo kết quả đo lường được. Nhà tuyển dụng muốn thấy bạn thành thạo cả tư duy chiến lược lẫn thực thi, với ví dụ cụ thể về các chiến dịch thành công.`,
  HR: (job) => `Các vị trí nhân sự cần thư xin việc ${job} thể hiện sự hiểu biết về động lực tổ chức và sự nhạy cảm với các vấn đề con người trong doanh nghiệp. Đơn ứng tuyển cần minh họa khả năng cân bằng lợi ích của nhân viên và tổ chức.`,
  'Customer Service': (job) => `Các vị trí dịch vụ khách hàng cần thư xin việc ${job} làm nổi bật khả năng lắng nghe, sự kiên nhẫn và tài năng giải quyết vấn đề. Nhà tuyển dụng tìm kiếm ứng viên có thể biến tình huống khó khăn thành trải nghiệm tích cực cho khách hàng.`,
  Logistics: (job) => `Ngành logistics đánh giá cao sự chính xác và hiệu quả vận hành. Thư xin việc ${job} cần chứng minh khả năng quản lý các hoạt động phức tạp, đảm bảo tiến độ và tối ưu hóa quy trình. Nhà tuyển dụng tìm kiếm chuyên gia có phương pháp và kinh nghiệm quản lý chuỗi cung ứng.`,
  Government: (job) => `Ứng tuyển vào khu vực công tuân theo các quy ước riêng. Thư xin việc ${job} cần thể hiện cam kết với dịch vụ công, hiểu biết khung pháp lý và khả năng làm việc trong khuôn khổ thủ tục hành chính.`,
  Legal: (job) => `Ngành pháp lý đòi hỏi thư xin việc ${job} hoàn hảo cả về hình thức và nội dung. Nhà tuyển dụng đánh giá tư duy logic, khả năng phân tích và sự am hiểu thuật ngữ pháp lý. Mỗi câu phải phản ánh sự chính xác và chú ý đến chi tiết mà nghề nghiệp đòi hỏi.`,
  Science: (job) => `Các vị trí khoa học cần thư xin việc ${job} làm nổi bật phương pháp tiếp cận phân tích và đóng góp nghiên cứu của bạn. Nhà tuyển dụng muốn thấy bằng chứng về sự nghiêm túc trong phương pháp, các công bố hoặc dự án ý nghĩa và khả năng giải thích các khái niệm phức tạp.`,
  Fitness: (job) => `Trong lĩnh vực thể thao và sức khỏe, thư xin việc ${job} cần truyền tải niềm đam mê với sự đồng hành và năng lực chuyên môn. Nhà tuyển dụng tìm kiếm chuyên gia có chứng chỉ thể hiện cam kết chân thành với sức khỏe và sự tiến bộ của khách hàng.`,
  Cleaning: (job) => `Đối với các vị trí vệ sinh, thư xin việc ${job} hiệu quả cần làm nổi bật sự đáng tin cậy, sự chú ý chi tiết và kiến thức về sản phẩm cùng kỹ thuật vệ sinh chuyên nghiệp. Nhà tuyển dụng ưu tiên ứng viên đúng giờ, tự chủ và chú trọng duy trì tiêu chuẩn vệ sinh cao.`,
  'Entry-Level': (job) => `Đối với người mới đi làm, thư xin việc ${job} cần bù đắp cho việc thiếu kinh nghiệm bằng sự nhiệt huyết, động lực và các kỹ năng có thể chuyển đổi từ trường học hoặc thực tập. Nhà tuyển dụng đánh giá cao ứng viên thể hiện tiềm năng học hỏi nhanh và mong muốn đóng góp thật sự.`,
  Business: (job) => `Môi trường kinh doanh cần thư xin việc ${job} thể hiện tư duy chiến lược và định hướng kết quả. Nhà tuyển dụng tìm kiếm ứng viên có thể đóng góp vào sự tăng trưởng của doanh nghiệp, với sự hiểu biết rõ ràng về thách thức thương mại và khả năng đề xuất giải pháp cụ thể.`,
  default: (job) => `Thư xin việc ${job} hiệu quả thiết lập mối liên kết trực tiếp giữa kỹ năng của bạn và nhu cầu cụ thể của doanh nghiệp. Nó thể hiện sự hiểu biết về vai trò, làm nổi bật thành tích phù hợp nhất và truyền tải động lực chân thành cho cơ hội nghề nghiệp này.`,
};

// ─── TAGS GENERATOR ─────────────────────────────────────────────────────────

export function generateTags(jobTitle, slug) {
  const lower = jobTitle.toLowerCase();
  return [
    `thư xin việc ${lower}`,
    `mẫu thư xin việc ${lower}`,
    `đơn xin việc ${lower}`,
    `mẫu đơn xin việc chuyên nghiệp`,
    `cách viết thư xin việc`,
    `đơn ứng tuyển ${lower}`,
    `thư xin việc 2026`,
    `mẫu đơn xin việc miễn phí`,
  ];
}

// ─── FAQ GENERATOR ──────────────────────────────────────────────────────────

export function generateFAQ(jobTitle) {
  const lower = jobTitle.toLowerCase();
  return [
    {
      question: `Cách viết thư xin việc cho vị trí ${lower} như thế nào?`,
      answer: `Bắt đầu bằng phần mở đầu cá nhân hóa, nhắc đến tên công ty và vị trí mong muốn. Sau đó trình bày hai đến ba thành tích cụ thể phù hợp với yêu cầu của vị trí ${lower}, sử dụng con số và kết quả đo lường được. Kết thúc bằng lời kết thể hiện động lực và đề nghị phỏng vấn.`,
    },
    {
      question: `Thư xin việc cho vị trí ${lower} nên dài bao nhiêu?`,
      answer: `Thư xin việc cho vị trí ${lower} nên gói gọn trong một trang, khoảng 250-400 từ. Nhà tuyển dụng dành ít thời gian cho mỗi hồ sơ, vì vậy hãy ưu tiên sự ngắn gọn và tác động. Mỗi đoạn phải cung cấp thông tin mới và phù hợp với vị trí.`,
    },
    {
      question: `Có nên lặp lại nội dung CV trong thư xin việc cho vị trí ${lower} không?`,
      answer: `Không, thư xin việc không nên lặp lại CV. Thư cần bổ sung cho CV bằng cách thêm bối cảnh, giải thích động lực và phát triển các thành tích phù hợp nhất với vị trí ${lower}. Hãy dùng thư để kể câu chuyện đằng sau những con số và thể hiện cá tính nghề nghiệp.`,
    },
    {
      question: `Có luôn cần gửi thư xin việc khi ứng tuyển vị trí ${lower} không?`,
      answer: `Ngay cả khi tin tuyển dụng không yêu cầu rõ ràng, một thư xin việc viết tốt cho vị trí ${lower} có thể tạo ra sự khác biệt giữa hai ứng viên có năng lực tương đương. Nó thể hiện sự nghiêm túc, sự quan tâm thật sự đến vị trí và khả năng giao tiếp chuyên nghiệp của bạn.`,
    },
    {
      question: `Thư xin việc ${lower} nên viết bằng tiếng Anh hay tiếng Việt?`,
      answer: `Tùy thuộc vào công ty ứng tuyển. Nếu tin tuyển dụng viết bằng tiếng Anh hoặc ứng tuyển vào công ty đa quốc gia (FDI), hãy viết thư bằng tiếng Anh. Nếu công ty Việt Nam đăng tin bằng tiếng Việt, viết thư bằng tiếng Việt sẽ phù hợp hơn. Khi không chắc chắn, chuẩn bị cả hai phiên bản là cách an toàn nhất.`,
    },
    {
      question: `Có nên nhắc đến mức lương mong muốn trong thư xin việc ${lower}?`,
      answer: `Tại Việt Nam, không nên đề cập mức lương trong thư xin việc trừ khi tin tuyển dụng yêu cầu rõ ràng. Để vấn đề lương cho buổi phỏng vấn khi bạn đã có cơ hội thể hiện giá trị. Nếu bắt buộc phải ghi, đưa ra khoảng lương (ví dụ: 15-20 triệu VND/tháng) thay vì con số cố định.`,
    },
  ];
}

// ─── BODY GENERATOR ─────────────────────────────────────────────────────────

export function generateBody(jobTitle, category, keySkills, slug) {
  const lower = jobTitle.toLowerCase();
  const skills = keySkills || [];
  const topSkills = skills.slice(0, 4).join(', ') || 'các kỹ năng cốt lõi của vị trí';
  const skill1 = skills[0] || 'quản lý dự án';
  const skill2 = skills[1] || 'làm việc nhóm';
  const skill3 = skills[2] || 'giao tiếp';
  const skill4 = skills[3] || 'giải quyết vấn đề';

  const norm = normalizeCategory(category);
  const opener = (CATEGORY_OPENERS[norm] || CATEGORY_OPENERS.default)(jobTitle);
  const companies = CATEGORY_COMPANIES[norm] || CATEGORY_COMPANIES.default;

  return `
## Cách Viết Thư Xin Việc ${jobTitle}

${opener}

Tại Việt Nam, thư xin việc (đơn xin việc) vẫn là phần quan trọng trong hồ sơ ứng tuyển, đặc biệt với các công ty đa quốc gia và tập đoàn lớn như ${companies}. Một thư xin việc thuyết phục cho vị trí ${lower} không chỉ đơn giản tóm tắt quá trình làm việc — nó chứng minh bạn đã dành thời gian tìm hiểu nhu cầu của vai trò và doanh nghiệp, đồng thời sở hữu những kỹ năng cụ thể để đáp ứng.

## Mẫu Thư Xin Việc ${jobTitle}

> **Tiêu đề: Ứng tuyển vị trí ${jobTitle} — Mã tuyển dụng: [Mã tin tuyển dụng]**
>
> Kính gửi [Tên người phụ trách tuyển dụng / Phòng Nhân sự],
>
> Tôi viết thư này để ứng tuyển vị trí ${lower} được đăng trên [TopCV / VietnamWorks / ITviec]. Với kinh nghiệm trong ${skill1} và ${skill2}, tôi tin rằng mình có thể đóng góp giá trị thiết thực cho [Tên Công ty].
>
> Tại [Công ty hiện tại/Trước đó], tôi đã phát triển chuyên môn vững chắc trong ${topSkills}. Thành tích nổi bật nhất của tôi là [ví dụ thành tích cụ thể với con số — ví dụ: "tăng doanh thu 500 triệu VND/quý" hoặc "giảm 30% thời gian xử lý"], giúp cải thiện kết quả đội nhóm rõ rệt. Sự thành thạo ${skill3} cũng giúp tôi [ví dụ đóng góp liên quan đến ${skill3}].
>
> Điều khiến tôi đặc biệt quan tâm đến [Tên Công ty] là [lý do cụ thể — ví dụ: văn hóa doanh nghiệp, dự án đang triển khai, vị thế trong ngành]. Tôi tin rằng kỹ năng ${skill4} và kinh nghiệm trong ngành sẽ giúp tôi đóng góp hiệu quả vào mục tiêu phát triển của quý công ty.
>
> Tôi rất mong được trao đổi thêm trong buổi phỏng vấn để trình bày chi tiết hơn cách kinh nghiệm của tôi đáp ứng nhu cầu của vị trí. Tôi sẵn sàng gặp mặt bất cứ khi nào thuận tiện cho quý công ty.
>
> Trân trọng,
>
> [Họ và Tên]
> [Số điện thoại] | [Email]

*Hãy thay thế các phần trong dấu ngoặc vuông bằng thông tin cá nhân và thông tin công ty bạn ứng tuyển. Tại Việt Nam, nên ghi rõ số điện thoại và email ngay trong phần ký tên để nhà tuyển dụng dễ liên hệ.*

## Các Yếu Tố Then Chốt Của Thư Xin Việc Hiệu Quả

### Phần Mở Đầu Cá Nhân Hóa

Tránh những câu mở đầu chung chung như "Kính gửi quý công ty, tôi xin gửi đơn ứng tuyển". Hãy nhắc đến tên công ty, mã tuyển dụng và một lý do cụ thể giải thích vì sao bạn quan tâm. Nhà tuyển dụng sẽ nhận ra ngay nếu phần mở đầu là bản sao gửi cho nhiều công ty. Hãy nhắc đến một dự án gần đây của công ty, một bài báo hoặc giá trị phù hợp với hành trình ${lower} của bạn.

### Thành Tích Có Con Số Cụ Thể

Mọi khẳng định cần được hỗ trợ bởi dữ liệu cụ thể. Thay vì viết "tôi đã cải thiện quy trình", hãy viết "tôi đã giảm 30% thời gian xử lý bằng cách triển khai phương pháp mới trong ${skill1}". Thành tích đo lường được mang lại sự đáng tin cậy cho đơn ứng tuyển và giúp nhà tuyển dụng đánh giá tác động thực tế của bạn khi làm ${lower}.

### Kết Nối Với Doanh Nghiệp

Chứng minh bạn đã nghiên cứu kỹ về công ty. Xác định một thách thức hoặc mục tiêu chiến lược mà bạn có thể đóng góp nhờ kỹ năng trong ${topSkills}. Phần này chứng minh đơn ứng tuyển của bạn là có mục tiêu và cân nhắc, không đơn giản là gửi đại. Nhà tuyển dụng đánh giá cao ứng viên hiểu bối cảnh của họ trước cả buổi phỏng vấn đầu tiên.

### Kết Thúc Với Giá Trị Cụ Thể

Phần kết thúc không nên chỉ là lời chào xã giao. Hãy tóm tắt trong một câu đóng góp đặc biệt của bạn và đề nghị cụ thể một buổi phỏng vấn. Khẳng định lại sự nhiệt huyết với vị trí ${lower} và cho biết khả năng sắp xếp của bạn. Một kết thúc mạnh mẽ tạo ấn tượng sâu và thúc đẩy nhà tuyển dụng liên hệ với bạn.

## Lời Khuyên Theo Cấp Độ Kinh Nghiệm

### Sinh Viên Mới Ra Trường

Tại Việt Nam, nhiều sinh viên ứng tuyển ngay sau khi tốt nghiệp mà chưa có kinh nghiệm chính thức. Hãy tập trung vào thực tập, đồ án tốt nghiệp, hoạt động CLB và kỹ năng có thể chuyển đổi. Giải thích cách đào tạo đại học đã chuẩn bị bạn cho vai trò ${lower}. Nhà tuyển dụng Việt Nam hiểu bạn mới bắt đầu — họ tìm kiếm tiềm năng, thái độ cầu thị và khả năng học hỏi nhanh.

### Chuyên Gia Có Kinh Nghiệm (3-7 Năm)

Với vài năm kinh nghiệm, hãy chọn hai đến ba thành tích phù hợp nhất với vị trí ${lower} mong muốn. Sử dụng con số cụ thể bằng VND khi có thể — ví dụ: "quản lý ngân sách 2 tỷ VND" hoặc "tăng doanh thu 35% so với cùng kỳ". Thể hiện sự phát triển nghề nghiệp và giải thích rõ ràng lý do muốn chuyển đổi nếu đang nhảy việc.

### Lãnh Đạo Cấp Cao

Ở cấp độ này, thư xin việc cho vị trí ${lower} cần phản ánh tầm nhìn chiến lược và kết quả ở quy mô doanh nghiệp. Tại Việt Nam, lãnh đạo cấp cao thường được tuyển qua headhunter (Navigos Search, Robert Walters Vietnam) — thư xin việc cần thể hiện bạn hiểu thị trường Việt Nam, có network trong ngành và có khả năng dẫn dắt đội nhóm đa văn hóa.

## Những Sai Lầm Thường Gặp Trong Thư Xin Việc Tại Việt Nam

- **Gửi thư chung không cá nhân hóa** — Nhà tuyển dụng Việt Nam nhận ra ngay một thư mẫu gửi hàng loạt. Mỗi đơn ứng tuyển cho vị trí ${lower} tại ${companies.split(',')[0]} sẽ khác với công ty khác. Hãy nhắc đến tên công ty, vị trí và lý do cụ thể.

- **Sử dụng giọng văn quá suồng sã** — Văn hóa doanh nghiệp Việt Nam coi trọng tôn ti trật tự. Thư xin việc cần giữ giọng văn trang trọng: dùng "Kính gửi" (không phải "Gửi"), "quý công ty" (không phải "công ty anh/chị"), và "Trân trọng" để kết thư.

- **Lặp lại CV từ đầu đến cuối** — Thư xin việc cần bổ sung cho CV, không sao chép nó. Hãy dùng thư để phát triển bối cảnh thành tích, giải thích lý do nhảy việc (nếu có) và truyền tải cá tính nghề nghiệp.

- **Không ghi rõ thông tin liên lạc** — Tại Việt Nam, nhà tuyển dụng thường liên hệ qua Zalo hoặc điện thoại. Ghi rõ số điện thoại (có mã vùng +84), email và link LinkedIn (nếu có) ngay trong thư.

- **Viết quá dài hoặc quá ngắn** — Thư xin việc ${lower} tại Việt Nam nên gói gọn trong 250-400 từ (nửa trang đến một trang A4). Nhà tuyển dụng dành ít thời gian cho mỗi hồ sơ — ngắn gọn nhưng đầy đủ là nguyên tắc vàng.

## Nền Tảng Đăng Đơn Ứng Tuyển Tại Việt Nam

Gửi thư xin việc kèm CV trên các nền tảng tuyển dụng phổ biến cho vị trí ${lower}:

- [TopCV.vn](https://www.topcv.vn/) — Nền tảng tuyển dụng lớn nhất Việt Nam, hỗ trợ đính kèm thư xin việc
- [VietnamWorks](https://www.vietnamworks.com/) — Chuyên vị trí trung-cao cấp, phổ biến với công ty đa quốc gia
- [ITviec](https://itviec.com/) — Chuyên ngành công nghệ, nhiều tin tuyển dụng từ ${companies.split(',')[0]}
- [CareerLink](https://www.careerlink.vn/) — Phủ rộng các tỉnh thành, đa ngành nghề
- [Joboko](https://www.joboko.com/) — Tuyển dụng đa ngành, tích hợp tạo CV và thư xin việc

## Hoàn Thiện Hồ Sơ Với CV Chuyên Nghiệp

Một thư xin việc hiệu quả xứng đáng đi kèm một CV xuất sắc. Đảm bảo hồ sơ ứng tuyển ${lower} của bạn nhất quán từ đầu đến cuối:

- [Tạo CV chuyên nghiệp](/vi/builder) với công cụ miễn phí, trực quan và tối ưu ATS của chúng tôi
- [Tham khảo mẫu CV ${lower}](/vi/resume-examples/${slug}) để lấy cảm hứng từ các mẫu phù hợp với ngành của bạn
- [Tạo thư xin việc tự động](/vi/tools/cover-letter) với trợ lý AI giúp tùy chỉnh nội dung theo hồ sơ của bạn

Một hồ sơ ứng tuyển hoàn chỉnh — CV được chăm chút, thư xin việc được cá nhân hóa — tăng đáng kể cơ hội được phỏng vấn cho vị trí ${lower} mong muốn.
`;
}
