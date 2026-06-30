import { execSync } from "child_process";

const notices = [
  // === 法学 ===
  {title:"北大国际法学院2026夏令营",school:"北京大学",college:"国际法学院",major:"法学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-21",link:"",olink:"",req:"",mat:""},
  {title:"西安交大法学院2026夏令营",school:"西安交通大学",college:"法学院",major:"法学",type:"SUMMER_CAMP",level:"985",prov:"陕西",city:"西安",end:"2026-06-23",link:"",olink:"",req:"",mat:""},
  // === 医学/药学 ===
  {title:"北大基础医学院2026夏令营",school:"北京大学",college:"基础医学院",major:"基础医学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-22",link:"",olink:"",req:"",mat:""},
  {title:"北大药学院2026夏令营",school:"北京大学",college:"药学院",major:"药学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-23",link:"",olink:"",req:"",mat:""},
  {title:"北大第一医院2026夏令营",school:"北京大学",college:"第一医院",major:"临床医学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-30",link:"",olink:"",req:"",mat:""},
  {title:"清华药学院2026夏令营",school:"清华大学",college:"药学院",major:"药学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-09",link:"",olink:"",req:"",mat:""},
  {title:"复旦药学院2026夏令营",school:"复旦大学",college:"药学院",major:"药学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-25",link:"",olink:"",req:"",mat:""},
  {title:"复旦智能医学研究院2026夏令营",school:"复旦大学",college:"智能医学研究院",major:"智能医学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-30",link:"",olink:"",req:"",mat:""},
  {title:"浙大医学院2026夏令营",school:"浙江大学",college:"医学院",major:"临床医学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-17",link:"",olink:"",req:"",mat:""},
  {title:"浙大药学院2026夏令营",school:"浙江大学",college:"药学院",major:"药学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-21",link:"",olink:"",req:"",mat:""},
  {title:"厦大公共卫生学院2026夏令营",school:"厦门大学",college:"公共卫生学院",major:"公共卫生",type:"SUMMER_CAMP",level:"985",prov:"福建",city:"厦门",end:"2026-06-25",link:"",olink:"",req:"",mat:""},
  {title:"中国医学科学院2026夏令营",school:"中国医学科学院",college:"研究生院",major:"医学",type:"SUMMER_CAMP",level:"DOUBLE_FIRST_CLASS",prov:"北京",city:"北京",end:"2026-06-06",link:"",olink:"",req:"",mat:""},
  // === 生物 ===
  {title:"北大生命科学学院2026夏令营",school:"北京大学",college:"生命科学学院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-14",link:"",olink:"",req:"CLS/PTN联合项目",mat:""},
  {title:"清华生命科学学院2026夏令营",school:"清华大学",college:"生命科学学院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-09",link:"",olink:"",req:"",mat:""},
  {title:"复旦生命科学学院2026夏令营",school:"复旦大学",college:"生命科学学院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-25",link:"",olink:"",req:"",mat:""},
  {title:"复旦脑科学研究院2026夏令营",school:"复旦大学",college:"脑科学研究院",major:"神经生物学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-25",link:"",olink:"",req:"",mat:""},
  {title:"浙大生命科学学院2026夏令营",school:"浙江大学",college:"生命科学学院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-22",link:"",olink:"",req:"",mat:""},
  {title:"浙大生命科学研究院2026夏令营",school:"浙江大学",college:"生命科学研究院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-28",link:"",olink:"",req:"",mat:""},
  {title:"南大生命科学学院2026夏令营",school:"南京大学",college:"生命科学学院",major:"生物学",type:"SUMMER_CAMP",level:"985",prov:"江苏",city:"南京",end:"2026-06-23",link:"",olink:"",req:"",mat:""},
  // === 化学 ===
  {title:"北大化学与分子工程学院2026夏令营",school:"北京大学",college:"化学与分子工程学院",major:"化学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-12",link:"",olink:"",req:"",mat:""},
  {title:"复旦化学系2026夏令营",school:"复旦大学",college:"化学系",major:"化学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-20",link:"",olink:"",req:"",mat:""},
  {title:"浙大化学系2026夏令营",school:"浙江大学",college:"化学系",major:"化学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-15",link:"",olink:"",req:"",mat:""},
  {title:"南大化学化工学院2026夏令营",school:"南京大学",college:"化学化工学院",major:"化学",type:"SUMMER_CAMP",level:"985",prov:"江苏",city:"南京",end:"2026-06-22",link:"",olink:"",req:"",mat:""},
  {title:"中科院化学研究所2026夏令营",school:"中国科学院",college:"化学研究所",major:"化学",type:"SUMMER_CAMP",level:"DOUBLE_FIRST_CLASS",prov:"北京",city:"北京",end:"2026-06-14",link:"",olink:"",req:"",mat:""},
  // === 物理 ===
  {title:"北大物理学院2026夏令营",school:"北京大学",college:"物理学院",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-06-15",link:"",olink:"",req:"含量子材料、现代光学研究所",mat:""},
  {title:"清华物理系2026夏令营",school:"清华大学",college:"物理系",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"北京",city:"北京",end:"2026-05-31",link:"",olink:"",req:"",mat:""},
  {title:"复旦物理学系2026夏令营",school:"复旦大学",college:"物理学系",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-06-20",link:"",olink:"",req:"",mat:""},
  {title:"浙大物理学院2026夏令营",school:"浙江大学",college:"物理学院",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-06-15",link:"",olink:"",req:"",mat:""},
  {title:"南大物理学院2026夏令营",school:"南京大学",college:"物理学院",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"江苏",city:"南京",end:"2026-06-30",link:"",olink:"",req:"",mat:""},
  {title:"中科大物理学院2026夏令营",school:"中国科学技术大学",college:"物理学院",major:"物理学",type:"SUMMER_CAMP",level:"985",prov:"安徽",city:"合肥",end:"2026-06-25",link:"",olink:"",req:"",mat:""},
  // === 土木/机械/材料/电气 ===
  {title:"上交船建学院2026夏令营",school:"上海交通大学",college:"船舶海洋与建筑工程学院",major:"土木工程",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-07-27",link:"https://gs.sjtu.edu.cn/post/detail/Z3MzMjA1",olink:"https://gs.sjtu.edu.cn/post/detail/Z3MzMjA1",req:"CET6≥425",mat:""},
  {title:"山大土建与水利学院2026夏令营",school:"山东大学",college:"土建与水利学院",major:"土木水利",type:"SUMMER_CAMP",level:"985",prov:"山东",city:"济南",end:"2026-07-05",link:"",olink:"https://tjsl.sdu.edu.cn/info/1541/14545.htm",req:"专业排名前30%",mat:""},
  {title:"同济卓越工程师学院2026夏令营",school:"同济大学",college:"卓越工程师学院",major:"智能建造",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-07-01",link:"",olink:"",req:"专业排名前15%",mat:""},
  {title:"浙大机械工程学院2026夏令营",school:"浙江大学",college:"机械工程学院",major:"机械工程",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-07-15",link:"",olink:"",req:"",mat:""},
  {title:"同济机器人与智能制造2026夏令营",school:"同济大学",college:"机械与能源工程学院",major:"机器人与智能制造",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-07-01",link:"",olink:"",req:"",mat:""},
  {title:"哈工大智能机器人2026暑期学校",school:"哈尔滨工业大学",college:"机电工程学院",major:"智能机器人",type:"SUMMER_CAMP",level:"985",prov:"黑龙江",city:"哈尔滨",end:"2026-05-11",link:"",olink:"",req:"",mat:""},
  {title:"浙大材料学院2026夏令营",school:"浙江大学",college:"材料科学与工程学院",major:"材料科学与工程",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-07-15",link:"",olink:"",req:"",mat:""},
  {title:"浙大ZJUI电气工程2026夏令营",school:"浙江大学",college:"ZJUI联合学院",major:"电气工程",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-07-02",link:"",olink:"",req:"英语水平良好",mat:""},
  {title:"哈工大电气工程2026暑期学校",school:"哈尔滨工业大学",college:"电气工程及自动化学院",major:"电气工程",type:"SUMMER_CAMP",level:"985",prov:"黑龙江",city:"哈尔滨",end:"2026-05-11",link:"",olink:"",req:"",mat:""},
  {title:"同济智能电动车辆2026夏令营",school:"同济大学",college:"汽车学院",major:"智能电动车辆",type:"SUMMER_CAMP",level:"985",prov:"上海",city:"上海",end:"2026-07-01",link:"",olink:"",req:"",mat:""},
  {title:"浙大生物系统工程2026夏令营",school:"浙江大学",college:"生物系统工程与食品科学学院",major:"农业工程",type:"SUMMER_CAMP",level:"985",prov:"浙江",city:"杭州",end:"2026-07-15",link:"",olink:"",req:"",mat:""},
];

for (let i = 0; i < notices.length; i++) {
  const n = notices[i];
  const id = "ai" + String(i + 6).padStart(3, "0");
  const s = new Date(n.end);
  s.setDate(s.getDate() - 35);
  const startStr = s.toISOString().split("T")[0];

  const esc = (v) => v.replace(/'/g, "''");
  const sql = `INSERT OR IGNORE INTO Notice (id, title, schoolName, college, major, type, schoolLevel, province, city, applicationStartDate, applicationEndDate, applicationLink, originalLink, requirements, materials, source, status, createdAt, updatedAt) VALUES ('${id}', '${esc(n.title)}', '${esc(n.school)}', '${esc(n.college)}', '${esc(n.major)}', '${n.type}', '${n.level}', '${n.prov}', '${n.city}', '${startStr}', '${n.end}', '${esc(n.link)}', '${esc(n.olink)}', '${esc(n.req)}', '${esc(n.mat)}', 'AI', 'PUBLISHED', datetime('now'), datetime('now'));`;

  try {
    execSync(`sqlite3 dev.db "${sql}"`, { cwd: "d:/求学伴侣", encoding: "utf8" });
  } catch (e) {
    // skip duplicates
  }
}

const count = execSync(
  "sqlite3 dev.db \"SELECT COUNT(*) FROM Notice WHERE source='AI';\"",
  { cwd: "d:/求学伴侣", encoding: "utf8" }
);
console.log("AI notices now: " + count.trim());

const total = execSync(
  "sqlite3 dev.db \"SELECT COUNT(*) FROM Notice;\"",
  { cwd: "d:/求学伴侣", encoding: "utf8" }
);
console.log("Total notices: " + total.trim());
