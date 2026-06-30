import { execSync } from "child_process";

const notices = [
  // 预推免
  {t:"哈工大计算学部预推免",s:"哈尔滨工业大学",c:"计算学部",m:"计算机科学与技术",tp:"PRE_ADMISSION",l:"985",p:"黑龙江",ct:"哈尔滨",e:"2026-08-20"},
  {t:"北大数学科学学院预推免",s:"北京大学",c:"数学科学学院",m:"数学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-09-10"},
  {t:"复旦环境科学与工程系预推免",s:"复旦大学",c:"环境科学与工程系",m:"环境科学",tp:"PRE_ADMISSION",l:"985",p:"上海",ct:"上海",e:"2026-09-10"},
  {t:"湖南大学经济与贸易学院预推免",s:"湖南大学",c:"经济与贸易学院",m:"经济学",tp:"PRE_ADMISSION",l:"985",p:"湖南",ct:"长沙",e:"2026-09-13"},
  {t:"西北工业大学数学与统计学院预推免",s:"西北工业大学",c:"数学与统计学院",m:"数学",tp:"PRE_ADMISSION",l:"985",p:"陕西",ct:"西安",e:"2026-09-18"},
  {t:"中央民族大学教育学院预推免",s:"中央民族大学",c:"教育学院",m:"教育学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-07-30"},
  {t:"中央民族大学法学院预推免",s:"中央民族大学",c:"法学院",m:"法学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-15"},
  {t:"中央民族大学管理学院预推免",s:"中央民族大学",c:"管理学院",m:"管理学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-14"},
  {t:"中央民族大学外国语学院预推免",s:"中央民族大学",c:"外国语学院",m:"外国语言文学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-10"},
  {t:"中央民族大学新闻与传播学院预推免",s:"中央民族大学",c:"新闻与传播学院",m:"新闻传播学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-10"},
  {t:"中央民族大学马克思主义学院预推免",s:"中央民族大学",c:"马克思主义学院",m:"马克思主义理论",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-15"},
  {t:"中央民族大学药学院预推免",s:"中央民族大学",c:"药学院",m:"药学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-15"},
  {t:"中央民族大学生环学院预推免",s:"中央民族大学",c:"生命与环境科学学院",m:"生物学/环境科学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-10"},
  {t:"中央民族大学经济学院直博预推免",s:"中央民族大学",c:"经济学院",m:"经济学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-14"},
  {t:"中央民族大学历史文化学院直博预推免",s:"中央民族大学",c:"历史文化学院",m:"历史学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-10"},
  {t:"中央民族大学信息工程学院预推免",s:"中央民族大学",c:"信息工程学院",m:"信息工程",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-09-01"},
  {t:"中央民族大学文学院直博预推免",s:"中央民族大学",c:"文学院",m:"中国语言文学",tp:"PRE_ADMISSION",l:"985",p:"北京",ct:"北京",e:"2026-08-19"},
  // 农学/环境
  {t:"浙大农业与生物技术学院夏令营",s:"浙江大学",c:"农业与生物技术学院",m:"农学",tp:"SUMMER_CAMP",l:"985",p:"浙江",ct:"杭州",e:"2026-06-25"},
  {t:"浙大动物科学学院暑期学校",s:"浙江大学",c:"动物科学学院",m:"动物科学",tp:"SUMMER_CAMP",l:"985",p:"浙江",ct:"杭州",e:"2026-06-20"},
  {t:"浙大环境与资源学院夏令营",s:"浙江大学",c:"环境与资源学院",m:"环境科学",tp:"SUMMER_CAMP",l:"985",p:"浙江",ct:"杭州",e:"2026-06-20"},
  {t:"南大环境学院开放日",s:"南京大学",c:"环境学院",m:"环境科学",tp:"SUMMER_CAMP",l:"985",p:"江苏",ct:"南京",e:"2026-06-25"},
  {t:"南大环境与健康研究院开放日",s:"南京大学",c:"环境与健康研究院",m:"环境健康",tp:"SUMMER_CAMP",l:"985",p:"江苏",ct:"南京",e:"2026-06-28"},
  {t:"清华深圳国际研究生院环境开放日",s:"清华大学",c:"深圳国际研究生院",m:"环境科学",tp:"SUMMER_CAMP",l:"985",p:"广东",ct:"深圳",e:"2026-06-22"},
  {t:"北大环境与能源学院研习营",s:"北京大学",c:"环境与能源学院",m:"环境科学与工程",tp:"SUMMER_CAMP",l:"985",p:"广东",ct:"深圳",e:"2026-06-23"},
  // 交通/建筑/管理
  {t:"上交船舶海洋与建筑工程学院夏令营",s:"上海交通大学",c:"船舶海洋与建筑工程学院",m:"船舶与海洋工程",tp:"SUMMER_CAMP",l:"985",p:"上海",ct:"上海",e:"2026-07-13"},
  {t:"吉林大学交通学院夏令营",s:"吉林大学",c:"交通学院",m:"交通运输工程",tp:"SUMMER_CAMP",l:"985",p:"吉林",ct:"长春",e:"2026-06-28"},
  {t:"武汉理工大学土建学院夏令营",s:"武汉理工大学",c:"土木工程与建筑学院",m:"建筑学",tp:"SUMMER_CAMP",l:"211",p:"湖北",ct:"武汉",e:"2026-06-29"},
  {t:"天津大学建筑工程学院夏令营",s:"天津大学",c:"建筑工程学院",m:"土木工程",tp:"SUMMER_CAMP",l:"985",p:"天津",ct:"天津",e:"2026-07-08"},
  {t:"广西大学公共管理学院夏令营",s:"广西大学",c:"公共管理学院",m:"公共管理",tp:"SUMMER_CAMP",l:"211",p:"广西",ct:"南宁",e:"2026-07-01"},
  {t:"北大城市规划与设计学院夏令营",s:"北京大学",c:"城市规划与设计学院",m:"城市规划",tp:"SUMMER_CAMP",l:"985",p:"广东",ct:"深圳",e:"2026-06-18"},
  {t:"南开大学旅游与服务学院预推免",s:"南开大学",c:"旅游与服务学院",m:"旅游管理",tp:"PRE_ADMISSION",l:"985",p:"天津",ct:"天津",e:"2026-08-22"},
  {t:"吉林大学研究生院推免",s:"吉林大学",c:"研究生院",m:"多专业",tp:"PRE_ADMISSION",l:"985",p:"吉林",ct:"长春",e:"2026-09-18"},
];

const esc = (v) => v.replace(/'/g, "''");
let added = 0;
const startId = 47; // ai047+

for (let i = 0; i < notices.length; i++) {
  const o = notices[i];
  const id = "ai" + String(startId + i).padStart(3, "0");
  const sd = new Date(o.e);
  sd.setDate(sd.getDate() - 35);
  const startDate = sd.toISOString().split("T")[0];

  const sql = `INSERT OR IGNORE INTO Notice (id, title, schoolName, college, major, type, schoolLevel, province, city, applicationStartDate, applicationEndDate, source, status, createdAt, updatedAt)
VALUES ('${id}', '${esc(o.t)}', '${esc(o.s)}', '${esc(o.c)}', '${esc(o.m)}', '${o.tp}', '${o.l}', '${o.p}', '${o.ct}', '${startDate}', '${o.e}', 'AI', 'PUBLISHED', datetime('now'), datetime('now'));`;

  try {
    execSync(`sqlite3 dev.db "${sql}"`, { encoding: "utf8" });
    added++;
  } catch (e) {
    console.error("Failed:", id, e.message?.substring(0, 80));
  }
}

console.log("Added:", added);
const total = execSync(
  `sqlite3 dev.db "SELECT COUNT(*) FROM Notice;"`,
  { encoding: "utf8" }
);
console.log("Total:", total.trim());
