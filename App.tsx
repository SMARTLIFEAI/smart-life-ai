/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Types ---
export interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  specs: {
    [key: string]: string | number | boolean;
  };
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  specLabels: { [key: string]: string };
  products: Product[];
}

export interface User {
  id: number;
  email: string;
}

export interface SavedComparison {
  id: number;
  userId: number;
  categoryId: string;
  productIds: string[]; // JSON string in DB
  createdAt: string;
}

// --- Constants ---
export const CATEGORIES: Category[] = [
  {
    id: 'robot-vacuum',
    name: 'ロボット掃除機',
    icon: 'Zap',
    specLabels: {
      battery: '電池の持ち',
      matter: 'つながりやすさ',
      power: '電気代',
      app: 'アプリの使いやすさ',
      suction: '吸い込む力',
      mopping: '水拭き'
    },
    products: [
      { id: 'rv-1', name: 'CleanMaster X10', brand: 'AeroTech', image: 'https://picsum.photos/seed/rv1/400/400', price: 89800, specs: { battery: '180分', matter: true, power: '45W', app: 'iOS/Android/Watch', suction: '8000Pa', mopping: '振動式' } },
      { id: 'rv-2', name: 'RoboVac Pro 2026', brand: 'SmartClean', image: 'https://picsum.photos/seed/rv2/400/400', price: 124000, specs: { battery: '240分', matter: true, power: '50W', app: 'iOS/Android/Matter Hub', suction: '10000Pa', mopping: '回転式' } },
      { id: 'rv-3', name: 'EcoSweep Lite', brand: 'EcoHome', image: 'https://picsum.photos/seed/rv3/400/400', price: 45000, specs: { battery: '120分', matter: false, power: '35W', app: 'iOS/Android', suction: '5000Pa', mopping: 'なし' } },
      { id: 'rv-4', name: 'DustDestroyer Z', brand: 'Z-Force', image: 'https://picsum.photos/seed/rv4/400/400', price: 72000, specs: { battery: '150分', matter: true, power: '40W', app: 'iOS/Android', suction: '7000Pa', mopping: '振動式' } },
      { id: 'rv-5', name: 'MopBot Elite', brand: 'AquaShine', image: 'https://picsum.photos/seed/rv5/400/400', price: 95000, specs: { battery: '200分', matter: true, power: '48W', app: 'iOS/Android', suction: '6000Pa', mopping: '超音波振動' } },
      { id: 'rv-6', name: 'SwiftSweep S1', brand: 'SwiftHome', image: 'https://picsum.photos/seed/rv6/400/400', price: 58000, specs: { battery: '140分', matter: false, power: '38W', app: 'iOS/Android', suction: '5500Pa', mopping: 'なし' } },
      { id: 'rv-7', name: 'UltraClean 360', brand: 'OmniTech', image: 'https://picsum.photos/seed/rv7/400/400', price: 110000, specs: { battery: '220分', matter: true, power: '52W', app: 'iOS/Android/Watch', suction: '9000Pa', mopping: '回転式' } },
      { id: 'rv-8', name: 'PetHair Pro', brand: 'FurFree', image: 'https://picsum.photos/seed/rv8/400/400', price: 82000, specs: { battery: '160分', matter: true, power: '42W', app: 'iOS/Android', suction: '8500Pa', mopping: 'なし' } },
      { id: 'rv-9', name: 'QuietClean Q1', brand: 'SilentNight', image: 'https://picsum.photos/seed/rv9/400/400', price: 65000, specs: { battery: '180分', matter: false, power: '30W', app: 'iOS/Android', suction: '4500Pa', mopping: '振動式' } },
      { id: 'rv-10', name: 'TitanVac Max', brand: 'TitanHome', image: 'https://picsum.photos/seed/rv10/400/400', price: 150000, specs: { battery: '300分', matter: true, power: '60W', app: 'iOS/Android/Matter Hub', suction: '12000Pa', mopping: 'デュアル回転' } }
    ]
  },
  {
    id: 'kitchen',
    name: 'キッチン家電',
    icon: 'Utensils',
    specLabels: {
      capacity: '容量',
      matter: 'つながりやすさ',
      power: '電気代',
      app: 'レシピ機能',
      heating: '温めかた',
      display: '画面の大きさ'
    },
    products: [
      { id: 'k-1', name: 'SmartOven AI', brand: 'CookTech', image: 'https://picsum.photos/seed/k1/400/400', price: 68000, specs: { capacity: '30L', matter: true, power: '1400W', app: '1000+レシピ', heating: '過熱水蒸気', display: '7インチ' } },
      { id: 'k-2', name: 'ChefBot 2026', brand: 'FutureKitchen', image: 'https://picsum.photos/seed/k2/400/400', price: 98000, specs: { capacity: '2.4L', matter: true, power: '800W', app: 'AI献立提案', heating: 'IH', display: '5インチ' } },
      { id: 'k-3', name: 'SteamMaster Pro', brand: 'PureCook', image: 'https://picsum.photos/seed/k3/400/400', price: 55000, specs: { capacity: '25L', matter: false, power: '1200W', app: '500レシピ', heating: 'スチーム', display: '4インチ' } },
      { id: 'k-4', name: 'AirFryer Smart', brand: 'CrispTech', image: 'https://picsum.photos/seed/k4/400/400', price: 28000, specs: { capacity: '5L', matter: true, power: '1500W', app: 'スマホ通知', heating: '熱風循環', display: 'LED' } },
      { id: 'k-5', name: 'SmartFridge X', brand: 'CoolLife', image: 'https://picsum.photos/seed/k5/400/400', price: 245000, specs: { capacity: '550L', matter: true, power: '350kWh/y', app: '在庫管理', heating: 'N/A', display: '21インチ' } },
      { id: 'k-6', name: 'InductionPro 4', brand: 'HeatWave', image: 'https://picsum.photos/seed/k6/400/400', price: 120000, specs: { capacity: '4口', matter: true, power: '5800W', app: '火力監視', heating: 'IH', display: 'タッチパネル' } },
      { id: 'k-7', name: 'SmartCoffee Bar', brand: 'BrewMaster', image: 'https://picsum.photos/seed/k7/400/400', price: 45000, specs: { capacity: '1.2L', matter: true, power: '1000W', app: 'カスタム抽出', heating: 'ボイラー', display: '3インチ' } },
      { id: 'k-8', name: 'DishWasher AI', brand: 'AquaClean', image: 'https://picsum.photos/seed/k8/400/400', price: 158000, specs: { capacity: '12人分', matter: true, power: '1100W', app: '洗剤自動投入', heating: 'ヒーター', display: '隠しLED' } },
      { id: 'k-9', name: 'RiceCooker Pro', brand: 'GrainTech', image: 'https://picsum.photos/seed/k9/400/400', price: 38000, specs: { capacity: '5.5合', matter: false, power: '1200W', app: '銘柄炊き分け', heating: '圧力IH', display: 'バックライト液晶' } },
      { id: 'k-10', name: 'SmartToaster Z', brand: 'ToastMaster', image: 'https://picsum.photos/seed/k10/400/400', price: 15000, specs: { capacity: '2枚', matter: true, power: '900W', app: '焼き色設定', heating: 'カーボンヒーター', display: 'なし' } }
    ]
  },
  {
    id: 'smart-lock',
    name: 'スマートロック',
    icon: 'Lock',
    specLabels: {
      battery: '電池の持ち',
      matter: 'つながりやすさ',
      unlock: '開けかた',
      app: '履歴の確認',
      security: 'セキュリティ',
      installation: '取り付け'
    },
    products: [
      { id: 'sl-1', name: 'SecureGate V3', brand: 'LockMaster', image: 'https://picsum.photos/seed/sl1/400/400', price: 24000, specs: { battery: '12ヶ月', matter: true, unlock: '指紋/顔認証/スマホ', app: 'リアルタイム通知', security: 'AES-256', installation: '両面テープ' } },
      { id: 'sl-2', name: 'KeyFree Pro', brand: 'OpenSesame', image: 'https://picsum.photos/seed/sl2/400/400', price: 32000, specs: { battery: '18ヶ月', matter: true, unlock: 'Apple HomeKey/指紋', app: 'ゲストキー発行', security: 'EAL6+', installation: 'ネジ固定/テープ' } },
      { id: 'sl-3', name: 'TouchLock Lite', brand: 'EasyAccess', image: 'https://picsum.photos/seed/sl3/400/400', price: 15000, specs: { battery: '6ヶ月', matter: false, unlock: '暗証番号/スマホ', app: '簡易履歴', security: 'AES-128', installation: '両面テープ' } },
      { id: 'sl-4', name: 'BioGuard X', brand: 'BioLock', image: 'https://picsum.photos/seed/sl4/400/400', price: 45000, specs: { battery: '24ヶ月', matter: true, unlock: '静脈認証/指紋', app: '高度な権限管理', security: 'EAL7', installation: 'ネジ固定' } },
      { id: 'sl-5', name: 'RetroFit S', brand: 'SmartTurn', image: 'https://picsum.photos/seed/sl5/400/400', price: 19800, specs: { battery: '10ヶ月', matter: true, unlock: 'スマホ/オートロック', app: 'ハンズフリー解錠', security: 'AES-256', installation: 'サムターン被せ' } },
      { id: 'sl-6', name: 'GateKeeper Pro', brand: 'IronClad', image: 'https://picsum.photos/seed/sl6/400/400', price: 58000, specs: { battery: '36ヶ月', matter: true, unlock: '顔認証/ICカード', app: '入退室ログ', security: 'Military Grade', installation: 'シリンダー交換' } },
      { id: 'sl-7', name: 'PadLock Smart', brand: 'TravelSafe', image: 'https://picsum.photos/seed/sl7/400/400', price: 8500, specs: { battery: '12ヶ月', matter: false, unlock: '指紋/スマホ', app: '解錠通知', security: 'AES-128', installation: '南京錠タイプ' } },
      { id: 'sl-8', name: 'WindowLock AI', brand: 'SafeView', image: 'https://picsum.photos/seed/sl8/400/400', price: 12000, specs: { battery: '12ヶ月', matter: true, unlock: 'スマホ/自動閉鎖', app: '閉め忘れ通知', security: 'AES-256', installation: '窓枠取付' } },
      { id: 'sl-9', name: 'OfficeLock Hub', brand: 'WorkSpace', image: 'https://picsum.photos/seed/sl9/400/400', price: 88000, specs: { battery: 'AC電源', matter: true, unlock: '社員証/顔認証', app: 'クラウド管理', security: 'EAL6+', installation: '電気錠連動' } },
      { id: 'sl-10', name: 'HomeKey Plus', brand: 'AppleWay', image: 'https://picsum.photos/seed/sl10/400/400', price: 39000, specs: { battery: '15ヶ月', matter: true, unlock: 'Apple HomeKey/NFC', app: 'HomeKit統合', security: 'Secure Enclave', installation: '両面テープ' } }
    ]
  },
  {
    id: 'camera',
    name: '見守りカメラ',
    icon: 'Camera',
    specLabels: {
      resolution: '映像の質',
      matter: 'つながりやすさ',
      storage: '保存方法',
      ai: 'AI機能',
      night: '夜間の見え方',
      audio: '会話機能'
    },
    products: [
      { id: 'cam-1', name: 'EyeGuard 4K', brand: 'VisionSafe', image: 'https://picsum.photos/seed/cam1/400/400', price: 18000, specs: { resolution: '4K', matter: true, storage: 'Cloud/SD', ai: '人物/ペット/車両', night: 'カラー夜間', audio: '対応' } },
      { id: 'cam-2', name: 'BabyMonitor Z', brand: 'TinyCare', image: 'https://picsum.photos/seed/cam2/400/400', price: 12000, specs: { resolution: '2K', matter: true, storage: 'SD', ai: '泣き声/寝返り', night: '赤外線', audio: '対応' } },
      { id: 'cam-3', name: 'Outdoor Pro', brand: 'VisionSafe', image: 'https://picsum.photos/seed/cam3/400/400', price: 25000, specs: { resolution: '4K', matter: true, storage: 'Cloud/HDD', ai: '不審者/顔認証', night: '投光器付き', audio: '対応' } },
      { id: 'cam-4', name: 'MiniCam Lite', brand: 'NanoView', image: 'https://picsum.photos/seed/cam4/400/400', price: 5800, specs: { resolution: '1080p', matter: false, storage: 'SD', ai: '動体検知', night: '赤外線', audio: '受話のみ' } },
      { id: 'cam-5', name: 'PanTilt 360', brand: 'SkyEye', image: 'https://picsum.photos/seed/cam5/400/400', price: 15000, specs: { resolution: '2K', matter: true, storage: 'Cloud/SD', ai: '自動追尾', night: 'カラー夜間', audio: '対応' } },
      { id: 'cam-6', name: 'Doorbell Cam', brand: 'Welcome', image: 'https://picsum.photos/seed/cam6/400/400', price: 22000, specs: { resolution: '2K', matter: true, storage: 'Cloud', ai: '置き配/人物', night: '赤外線', audio: '対応' } },
      { id: 'cam-7', name: 'PrivacyCam X', brand: 'ShieldView', image: 'https://picsum.photos/seed/cam7/400/400', price: 19800, specs: { resolution: '2K', matter: true, storage: 'オンデバイス', ai: '人物', night: '赤外線', audio: '物理ミュート' } },
      { id: 'cam-8', name: 'SolarEye S1', brand: 'GreenVision', image: 'https://picsum.photos/seed/cam8/400/400', price: 28000, specs: { resolution: '2K', matter: true, storage: 'SD', ai: '動体検知', night: '赤外線', audio: '対応' } },
      { id: 'cam-9', name: 'PetCam Treat', brand: 'PawPal', image: 'https://picsum.photos/seed/cam9/400/400', price: 24000, specs: { resolution: '1080p', matter: false, storage: 'Cloud', ai: '吠え声/活動', night: '赤外線', audio: 'おやつ投下' } },
      { id: 'cam-10', name: 'MultiLens Pro', brand: 'VisionSafe', image: 'https://picsum.photos/seed/cam10/400/400', price: 48000, specs: { resolution: '8K', matter: true, storage: 'HDD/NAS', ai: '高度な行動分析', night: '超高感度カラー', audio: '対応' } }
    ]
  },
  {
    id: 'sensor',
    name: '防犯・センサー',
    icon: 'ShieldCheck',
    specLabels: {
      battery: '電池の持ち',
      matter: '他メーカーとの連携',
      range: '反応する広さ',
      protocol: 'つなぎかた',
      alert: 'お知らせの速さ',
      size: '大きさ'
    },
    products: [
      { id: 'sn-1', name: 'MotionSense M1', brand: 'SafeHome', image: 'https://picsum.photos/seed/sn1/400/400', price: 5800, specs: { battery: '2年', matter: true, range: '7m / 120°', protocol: 'Thread', alert: '0.1秒', size: '30x30x15mm' } },
      { id: 'sn-2', name: 'WaterLeak S1', brand: 'SafeHome', image: 'https://picsum.photos/seed/sn2/400/400', price: 4500, specs: { battery: '3年', matter: true, range: '接点検知', protocol: 'Thread', alert: '即時', size: '40x40x10mm' } },
      { id: 'sn-3', name: 'DoorWindow Z', brand: 'SafeHome', image: 'https://picsum.photos/seed/sn3/400/400', price: 3800, specs: { battery: '2年', matter: true, range: '磁気検知', protocol: 'Thread', alert: '0.1秒', size: '20x50x10mm' } },
      { id: 'sn-4', name: 'TempHumid X', brand: 'ClimateControl', image: 'https://picsum.photos/seed/sn4/400/400', price: 6200, specs: { battery: '1年', matter: true, range: '室内', protocol: 'Thread', alert: '5分毎更新', size: '50x50x20mm' } },
      { id: 'sn-5', name: 'CO2Monitor Pro', brand: 'AirQuality', image: 'https://picsum.photos/seed/sn5/400/400', price: 12000, specs: { battery: 'AC/充電', matter: true, range: '室内', protocol: 'Wi-Fi/Thread', alert: '即時', size: '80x80x30mm' } },
      { id: 'sn-6', name: 'Vibration S1', brand: 'SafeHome', image: 'https://picsum.photos/seed/sn6/400/400', price: 4200, specs: { battery: '2年', matter: true, range: '振動検知', protocol: 'Thread', alert: '即時', size: '35x35x10mm' } },
      { id: 'sn-7', name: 'SmokeAlarm Smart', brand: 'FireSafe', image: 'https://picsum.photos/seed/sn7/400/400', price: 9800, specs: { battery: '10年', matter: true, range: '室内', protocol: 'Thread', alert: '即時/警報', size: '100x100x40mm' } },
      { id: 'sn-8', name: 'LightSensor L1', brand: 'AutoLight', image: 'https://picsum.photos/seed/sn8/400/400', price: 3500, specs: { battery: '2年', matter: true, range: '0-10000lux', protocol: 'Thread', alert: '照度変化時', size: '30x30x15mm' } },
      { id: 'sn-9', name: 'PresenceRadar', brand: 'OmniSense', image: 'https://picsum.photos/seed/sn9/400/400', price: 15800, specs: { battery: 'AC電源', matter: true, range: '5m / 180°', protocol: 'Thread', alert: 'ミリ波検知', size: '60x60x20mm' } },
      { id: 'sn-10', name: 'MultiSensor 6', brand: 'Aeon', image: 'https://picsum.photos/seed/sn10/400/400', price: 9500, specs: { battery: '1年', matter: false, range: '多機能', protocol: 'Z-Wave', alert: '即時', size: '45x45x45mm' } }
    ]
  },
  {
    id: 'ac',
    name: 'スマートエアコン',
    icon: 'Wind',
    specLabels: {
      power: '省エネ度',
      matter: '他メーカーとの連携',
      ai: 'かしこい自動運転',
      app: '外から操作',
      filter: '空気のきれいさ',
      noise: '音の静かさ'
    },
    products: [
      { id: 'ac-1', name: 'CoolAir AI 2026', brand: 'ClimateTech', image: 'https://picsum.photos/seed/ac1/400/400', price: 185000, specs: { power: 'APF 7.2', matter: true, ai: '人感/日射センサー', app: '消費電力見える化', filter: 'HEPA', noise: '18dB' } },
      { id: 'ac-2', name: 'EcoBreeze X', brand: 'GreenLife', image: 'https://picsum.photos/seed/ac2/400/400', price: 145000, specs: { power: 'APF 6.8', matter: true, ai: '温度予測', app: '基本操作', filter: '標準', noise: '20dB' } },
      { id: 'ac-3', name: 'ArcticFlow Pro', brand: 'FrostTech', image: 'https://picsum.photos/seed/ac3/400/400', price: 220000, specs: { power: 'APF 7.5', matter: true, ai: '全自動学習', app: '高度なスケジュール', filter: 'プラズマクラスター', noise: '17dB' } },
      { id: 'ac-4', name: 'CompactCool', brand: 'SpaceSave', image: 'https://picsum.photos/seed/ac4/400/400', price: 88000, specs: { power: 'APF 5.8', matter: false, ai: 'なし', app: 'Wi-Fiアダプタ別売', filter: '標準', noise: '22dB' } },
      { id: 'ac-5', name: 'SmartMulti 3', brand: 'ClimateTech', image: 'https://picsum.photos/seed/ac5/400/400', price: 350000, specs: { power: 'APF 6.5', matter: true, ai: '部屋間連携', app: '一括管理', filter: 'HEPA', noise: '19dB' } },
      { id: 'ac-6', name: 'SilentNight AC', brand: 'QuietHome', image: 'https://picsum.photos/seed/ac6/400/400', price: 168000, specs: { power: 'APF 7.0', matter: true, ai: '睡眠リズム連動', app: '静音モード設定', filter: '標準', noise: '15dB' } },
      { id: 'ac-7', name: 'PowerCool Max', brand: 'TitanHome', image: 'https://picsum.photos/seed/ac7/400/400', price: 280000, specs: { power: 'APF 6.2', matter: true, ai: '急速冷却', app: '電力制限設定', filter: 'HEPA', noise: '25dB' } },
      { id: 'ac-8', name: 'HumidCool AI', brand: 'AquaAir', image: 'https://picsum.photos/seed/ac8/400/400', price: 210000, specs: { power: 'APF 7.1', matter: true, ai: '除湿/加湿制御', app: '湿度グラフ表示', filter: '標準', noise: '19dB' } },
      { id: 'ac-9', name: 'RetroFit Smart', brand: 'OldNew', image: 'https://picsum.photos/seed/ac9/400/400', price: 12000, specs: { power: '既存機依存', matter: true, ai: 'IR学習', app: 'スマートリモコン型', filter: 'N/A', noise: 'N/A' } },
      { id: 'ac-10', name: 'DesignCool S', brand: 'ArtHome', image: 'https://picsum.photos/seed/ac10/400/400', price: 240000, specs: { power: 'APF 6.9', matter: true, ai: 'インテリア調和', app: 'デザインUI', filter: '標準', noise: '18dB' } }
    ]
  },
  {
    id: 'air-purifier',
    name: '空気清浄機',
    icon: 'AirVent',
    specLabels: {
      area: 'お部屋の広さ',
      matter: '他メーカーとの連携',
      sensor: '汚れセンサー',
      filter: 'フィルターの持ち',
      noise: '音の静かさ',
      size: '大きさ'
    },
    products: [
      { id: 'ap-1', name: 'PureFlow Pro', brand: 'CleanAir', image: 'https://picsum.photos/seed/ap1/400/400', price: 42000, specs: { area: '30畳', matter: true, sensor: 'PM2.5/ニオイ/湿度', filter: '10年', noise: '15-45dB', size: 'W300xH600' } },
      { id: 'ap-2', name: 'CompactAir 10', brand: 'CleanAir', image: 'https://picsum.photos/seed/ap2/400/400', price: 18000, specs: { area: '10畳', matter: true, sensor: 'ホコリ', filter: '2年', noise: '20-50dB', size: 'W200xH350' } },
      { id: 'ap-3', name: 'TurboPurify X', brand: 'AeroTech', image: 'https://picsum.photos/seed/ap3/400/400', price: 65000, specs: { area: '50畳', matter: true, sensor: 'VOC/PM2.5/花粉', filter: '5年', noise: '18-55dB', size: 'W400xH750' } },
      { id: 'ap-4', name: 'HumidPure AI', brand: 'AquaAir', image: 'https://picsum.photos/seed/ap4/400/400', price: 58000, specs: { area: '25畳', matter: true, sensor: '湿度/温度/PM2.5', filter: '10年', noise: '17-48dB', size: 'W350xH650' } },
      { id: 'ap-5', name: 'PetPure S1', brand: 'FurFree', image: 'https://picsum.photos/seed/ap5/400/400', price: 35000, specs: { area: '20畳', matter: false, sensor: 'ニオイ/毛', filter: '1年', noise: '22-52dB', size: 'W300xH500' } },
      { id: 'ap-6', name: 'DesktopFlow', brand: 'NanoView', image: 'https://picsum.photos/seed/ap6/400/400', price: 9800, specs: { area: '3畳', matter: true, sensor: 'なし', filter: '6ヶ月', noise: '25-40dB', size: 'W100xH200' } },
      { id: 'ap-7', name: 'CarPure Smart', brand: 'DriveClean', image: 'https://picsum.photos/seed/ap7/400/400', price: 12000, specs: { area: '車内', matter: true, sensor: 'PM2.5', filter: '1年', noise: '30-45dB', size: 'カップホルダー型' } },
      { id: 'ap-8', name: 'MedicalGrade M1', brand: 'BioSafe', image: 'https://picsum.photos/seed/ap8/400/400', price: 128000, specs: { area: '40畳', matter: true, sensor: 'ウイルス/細菌/ガス', filter: '3年', noise: '20-60dB', size: 'W450xH800' } },
      { id: 'ap-9', name: 'SilentPure Q', brand: 'QuietHome', image: 'https://picsum.photos/seed/ap9/400/400', price: 48000, specs: { area: '22畳', matter: true, sensor: 'PM2.5', filter: '10年', noise: '12-42dB', size: 'W320xH580' } },
      { id: 'ap-10', name: 'SmartFan Purify', brand: 'WindMaster', image: 'https://picsum.photos/seed/ap10/400/400', price: 78000, specs: { area: '35畳', matter: true, sensor: '全方位', filter: '2年', noise: '20-58dB', size: 'タワーファン型' } }
    ]
  },
  {
    id: 'speaker',
    name: 'スマートスピーカー',
    icon: 'Speaker',
    specLabels: {
      assistant: '声で操作',
      matter: '他メーカーとの連携',
      sound: '音の良さ',
      display: '画面の有無',
      privacy: '安心機能',
      connectivity: 'つながりやすさ'
    },
    products: [
      { id: 'sp-1', name: 'HomeHub Max', brand: 'SoundCore', image: 'https://picsum.photos/seed/sp1/400/400', price: 28000, specs: { assistant: 'Multi-AI', matter: true, sound: '360°空間オーディオ', display: '10インチ', privacy: '物理スイッチ', connectivity: 'Wi-Fi 7 / Thread' } },
      { id: 'sp-2', name: 'MiniDot 5', brand: 'EchoLine', image: 'https://picsum.photos/seed/sp2/400/400', price: 6800, specs: { assistant: 'Alexa', matter: true, sound: '標準', display: 'LED時計', privacy: 'マイクオフボタン', connectivity: 'Wi-Fi 5' } },
      { id: 'sp-3', name: 'AudioPro Smart', brand: 'HiFiTech', image: 'https://picsum.photos/seed/sp3/400/400', price: 85000, specs: { assistant: 'Google/Alexa', matter: true, sound: 'ハイレゾ/真空管', display: 'なし', privacy: '完全遮断', connectivity: 'Wi-Fi 6E / LAN' } },
      { id: 'sp-4', name: 'ScreenView 7', brand: 'EchoLine', image: 'https://picsum.photos/seed/sp4/400/400', price: 15000, specs: { assistant: 'Alexa', matter: true, sound: 'ステレオ', display: '7インチ', privacy: 'カメラカバー', connectivity: 'Wi-Fi 6' } },
      { id: 'sp-5', name: 'PortableGo', brand: 'SoundCore', image: 'https://picsum.photos/seed/sp5/400/400', price: 19800, specs: { assistant: 'Google', matter: true, sound: '重低音強化', display: 'なし', privacy: '防水/防塵', connectivity: 'BT/Wi-Fi' } },
      { id: 'sp-6', name: 'WallMount S', brand: 'FlatAudio', image: 'https://picsum.photos/seed/sp6/400/400', price: 32000, specs: { assistant: 'Multi-AI', matter: true, sound: '平面駆動', display: 'E-Ink', privacy: '物理スイッチ', connectivity: 'Thread' } },
      { id: 'sp-7', name: 'KidsBuddy', brand: 'EchoLine', image: 'https://picsum.photos/seed/sp7/400/400', price: 8800, specs: { assistant: 'Kids AI', matter: false, sound: '標準', display: 'なし', privacy: 'ペアレンタルコントロール', connectivity: 'Wi-Fi 5' } },
      { id: 'sp-8', name: 'CinemaBar Smart', brand: 'HiFiTech', image: 'https://picsum.photos/seed/sp8/400/400', price: 120000, specs: { assistant: 'Google/Alexa', matter: true, sound: 'Dolby Atmos 7.1', display: 'なし', privacy: 'マイクオフ', connectivity: 'HDMI/Wi-Fi 7' } },
      { id: 'sp-9', name: 'ClockRadio AI', brand: 'RetroFuture', image: 'https://picsum.photos/seed/sp9/400/400', price: 12000, specs: { assistant: 'Alexa', matter: true, sound: '標準', display: 'レトロLED', privacy: 'マイクオフ', connectivity: 'Wi-Fi 5' } },
      { id: 'sp-10', name: 'StudioPro 360', brand: 'SoundCore', image: 'https://picsum.photos/seed/sp10/400/400', price: 45000, specs: { assistant: 'Multi-AI', matter: true, sound: 'スタジオモニター級', display: 'なし', privacy: '物理スイッチ', connectivity: 'Wi-Fi 6E' } }
    ]
  },
  {
    id: 'lighting',
    name: '照明・カーテン',
    icon: 'Lightbulb',
    specLabels: {
      brightness: 'ライトの明るさ',
      matter: '他メーカーとの連携',
      color: '色の変えかた',
      lifespan: '使える長さ',
      automation: '自動タイマー',
      protocol: 'つなぎかた'
    },
    products: [
      { id: 'lt-1', name: 'SmartGlow Bulb', brand: 'Lumina', image: 'https://picsum.photos/seed/lt1/400/400', price: 3800, specs: { brightness: '800lm', matter: true, color: '1600万色', lifespan: '25000h', automation: '日の出/日の入り', protocol: 'Thread' } },
      { id: 'lt-2', name: 'CeilingPro AI', brand: 'Lumina', image: 'https://picsum.photos/seed/lt2/400/400', price: 28000, specs: { brightness: '5000lm', matter: true, color: '2700K-6500K', lifespan: '40000h', automation: 'サーカディアン', protocol: 'Wi-Fi/Thread' } },
      { id: 'lt-3', name: 'SmartCurtain X', brand: 'SlideHome', image: 'https://picsum.photos/seed/lt3/400/400', price: 15000, specs: { brightness: 'N/A', matter: true, color: 'N/A', lifespan: '5年(電池)', automation: '照度連動', protocol: 'Thread' } },
      { id: 'lt-4', name: 'LightStrip Pro', brand: 'NeonFlex', image: 'https://picsum.photos/seed/lt4/400/400', price: 9800, specs: { brightness: '1200lm/m', matter: true, color: 'RGBIC', lifespan: '30000h', automation: '音楽同期', protocol: 'Wi-Fi' } },
      { id: 'lt-5', name: 'DeskLamp Smart', brand: 'EyeCare', image: 'https://picsum.photos/seed/lt5/400/400', price: 12000, specs: { brightness: '1000lux', matter: true, color: '演色性Ra95', lifespan: '25000h', automation: '集中モード', protocol: 'Thread' } },
      { id: 'lt-6', name: 'OutdoorFlood', brand: 'VisionSafe', image: 'https://picsum.photos/seed/lt6/400/400', price: 18000, specs: { brightness: '3000lm', matter: true, color: '5000K', lifespan: '50000h', automation: '動体検知連動', protocol: 'Thread' } },
      { id: 'lt-7', name: 'SmartBlind M1', brand: 'SlideHome', image: 'https://picsum.photos/seed/lt7/400/400', price: 35000, specs: { brightness: '遮光1級', matter: true, color: 'N/A', lifespan: '10年', automation: 'スケジュール', protocol: 'Thread' } },
      { id: 'lt-8', name: 'VintageSmart', brand: 'RetroFuture', image: 'https://picsum.photos/seed/lt8/400/400', price: 4500, specs: { brightness: '400lm', matter: true, color: '電球色(エジソン)', lifespan: '15000h', automation: 'なし', protocol: 'Thread' } },
      { id: 'lt-9', name: 'PanelLight AI', brand: 'ArtHome', image: 'https://picsum.photos/seed/lt9/400/400', price: 42000, specs: { brightness: '3500lm', matter: true, color: 'フルカラー', lifespan: '40000h', automation: 'シーン演出', protocol: 'Wi-Fi/Thread' } },
      { id: 'lt-10', name: 'NightLight Mini', brand: 'SleepWell', image: 'https://picsum.photos/seed/lt10/400/400', price: 2800, specs: { brightness: '50lm', matter: true, color: '暖色', lifespan: '20000h', automation: '人感センサー', protocol: 'Thread' } }
    ]
  },
  {
    id: 'hub',
    name: 'プラグ・ハブ',
    icon: 'Network',
    specLabels: {
      capacity: 'つなげる数',
      matter: '他メーカーとの連携',
      monitoring: '電気の使用量',
      protocol: 'つなぎかた',
      size: '大きさ',
      security: 'セキュリティ'
    },
    products: [
      { id: 'hb-1', name: 'Matter Hub Pro', brand: 'ConnectX', image: 'https://picsum.photos/seed/hb1/400/400', price: 12000, specs: { capacity: 'N/A', matter: true, monitoring: '全デバイス', protocol: 'Ethernet/Wi-Fi/Thread', size: '80x80x20mm', security: 'Secure Element' } },
      { id: 'hb-2', name: 'SmartPlug Mini', brand: 'ConnectX', image: 'https://picsum.photos/seed/hb2/400/400', price: 2800, specs: { capacity: '15A', matter: true, monitoring: '消費電力', protocol: 'Wi-Fi/Thread', size: '40x40x30mm', security: 'WPA3' } },
      { id: 'hb-3', name: 'MultiHub G2', brand: 'OmniLink', image: 'https://picsum.photos/seed/hb3/400/400', price: 8500, specs: { capacity: '128台', matter: true, monitoring: 'なし', protocol: 'Zigbee/Thread/Wi-Fi', size: '100x100x25mm', security: 'AES-128' } }
    ]
  }
];

const BackgroundLine = ({ line, scrollYProgress, opacity, scale }: any) => {
  const rotate = useTransform(scrollYProgress, [0, 1], line.rotateRange);
  
  return (
    <motion.div 
      style={{ 
        top: line.top, 
        left: line.left, 
        right: line.right,
        height: line.height,
        rotate,
        opacity,
        scale
      }}
      className={`absolute w-[1px] ${line.color} blur-[1px]`}
    />
  );
};

const BackgroundAnimation = () => {
  const { scrollYProgress } = useScroll();
  
  // Scroll-based transforms
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0.05, 0.005]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Define "random" lines with different properties
  const lines = [
    { top: '-5%', left: '-10%', height: '140px', color: 'bg-black', rotateRange: [25, 10] },
    { top: '15%', right: '-15%', height: '60px', color: 'bg-slate-800', rotateRange: [-40, -20] },
    { top: '35%', left: '-20%', height: '200px', color: 'bg-slate-200', rotateRange: [15, 5] },
    { top: '50%', right: '-10%', height: '40px', color: 'bg-slate-600', rotateRange: [-10, -30] },
    { top: '65%', left: '-5%', height: '120px', color: 'bg-slate-400', rotateRange: [45, 25] },
    { top: '80%', right: '-20%', height: '180px', color: 'bg-slate-100', rotateRange: [-20, -5] },
    { top: '95%', left: '-15%', height: '80px', color: 'bg-black', rotateRange: [10, 40] },
    { top: '25%', left: '10%', height: '2px', color: 'bg-slate-900', rotateRange: [60, 80] },
    { top: '75%', right: '5%', height: '4px', color: 'bg-slate-300', rotateRange: [-70, -50] },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#fbfbfd]">
      {lines.map((line, i) => (
        <BackgroundLine 
          key={i} 
          line={line} 
          scrollYProgress={scrollYProgress} 
          opacity={opacity} 
          scale={scale} 
        />
      ))}

      {/* Subtle Gradient for Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-40" />
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'home' | 'category' | 'builder' | 'account' | 'blog' | 'blog-post'>('home');
  const [selectedBlogPost, setSelectedBlogPost] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>([null, null, null]);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  
  // Auth & User State
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Saved Comparisons
  const [savedComparisons, setSavedComparisons] = useState<SavedComparison[]>([]);
  const [showMyComparisons, setShowMyComparisons] = useState(false);

  // Quick Compare State
  const [quickCompareSelection, setQuickCompareSelection] = useState<string[]>([]);
  const [showQuickCompare, setShowQuickCompare] = useState(false);
  const [toasts, setToasts] = useState<{id: number, message: string}[]>([]);

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };
  
  // Blog State
  const [blogPosts] = useState([
    {
      id: 1,
      title: '違うメーカーの家電が、もっとつながるようになります',
      excerpt: '新しい共通のルールが登場。これからはメーカーを気にせず、好きな家電を選べるようになります。',
      content: `これまでのスマート家電は、同じメーカーで揃えないとうまく動かないことが多くありました。しかし、最近始まった「新しい共通ルール（Matter）」のおかげで、その壁がなくなろうとしています。

ここが便利になります：
1. 電気の使いすぎをチェック：お家全体の電気をかしこく管理できるようになります。
2. つながりが途切れない：専用の通り道を使うことで、いつでもスムーズに動きます。
3. いろんな家電が仲間入り：空気清浄機や掃除機も、このルールで動くようになります。

これからは「どのブランドか」ではなく「どんな機能が欲しいか」で選べるようになります。2026年は、お家の中がもっと自由につながる楽しい年になりそうです。`,
      date: '2026.02.20',
      category: 'トレンド',
      image: 'https://picsum.photos/seed/blog1/800/400'
    },
    {
      id: 2,
      title: 'かしこいエアコンで、電気代を節約するコツ',
      excerpt: '最新のエアコンは、自分で考えて動きます。快適さを保ちながら、電気代を抑える仕組みをご紹介。',
      content: `電気代が気になる今日この頃。2026年の最新エアコンは、自分でお部屋の状態を判断して、一番効率の良い動きをしてくれます。

ここがすごいです：
- 先回りして冷やす：お天気をチェックして、お部屋が暑くなる前に準備を始めます。
- 家族のクセを覚える：いつ帰ってくるか、どこに座るかを覚えて、無駄な運転を減らします。
- 人に合わせて風を送る：人の場所や体感温度を見守って、ちょうど良い涼しさを届けます。

これらの機能のおかげで、我慢しなくても電気代をこれまでの3割くらい安く�  ]);

  const comparatorRef = useRef<HTMLDivElement>(null);��てくれる。そんな安心な暮らしが始まっています。`,
      date: '2026.01.01',
      category: '防犯・センサー',
      image: 'https://picsum.photos/seed/blog10/800/400'
    }
  ]);��すぐにお知らせします。
- 家族の異変に気づく：カメラを使わずに、誰かが倒れていないかを見守るセンサーもあります。
- 自動で止める：ガス漏れなどを見つけたら、自動で元栓を閉めてくれる連携も可能です。

お家全体があなたを見守ってくれる。そんな安心な暮らしが始まっています。`,
      date: '2026.01.01',
      category: '防犯・センサー',
      image: 'https://picsum.photos/seed/blog10/800/400'
    }
  ]);
慢しなくても電気代をこれまでの3割くらい安くできるかもしれません。`,
      date: '2026.02.15',
      category: 'スマートエアコン',
      image: 'https://picsum.photos/seed/blog2/800/400'
    },
    {
      id: 3,
      title: '賃貸でも大丈夫！スマホでカギを開ける方法',
      excerpt: '工事をしなくても、今のドアに付けるだけで便利に。セキュリティも安心な最新のカギをご紹介。',
      content: `「賃貸だから、カギを替えるのは無理かな…」と思っていませんか？今は、今のカギの上からペタッと貼るだけで使えるタイプが人気です。

こんなに便利になります：
- 手ぶらで開けられる：お買い物で両手がふさがっていても、ドアに近づくだけでカギが開きます。
- 家族や友達に合鍵を送れる：スマホで「この時間だけ使えるカギ」を送ることができます。
- 閉め忘れがなくなる：ドアが閉まると自動でカギがかかるので、外出先で不安になりません。

今のカギを傷つけずに付けられて、引っ越すときも簡単に外せます。一人暮らしの防犯にもぴったりです。`,
      date: '2026.02.10',
      category: 'スマートロック',
      image: 'https://picsum.photos/seed/blog3/800/400'
    },
    {
      id: 4,
      title: 'お家のネットが安定しない…そんな時の解決策',
      excerpt: '家電が増えるとネットが混み合います。専用の通り道を作ることで、いつでもサクサク動くようになります。',
      content: `スマート家電が増えてくると、Wi-Fiが混み合って「動かない！」ということが起きやすくなります。そんな時のために、家電専用の新しいつなぎかた（Thread）が注目されています。

ここが良いところ：
1. 網目状につながる：家電同士が助け合ってつながるので、どこに置いても安定します。
2. 電池が長持ち：小さなセンサーなども、電池を替えずに数年間使えます。
3. 反応がバツグン：スイッチを押した瞬間にパッと電気がつくような、気持ちいい反応の速さが特徴です。

これからのスマートホームは、このつなぎかたに対応しているかどうかが、使い心地を決める大切なポイントになります。`,
      date: '2026.02.05',
      category: '技術解説',
      image: 'https://picsum.photos/seed/blog4/800/400'
    },
    {
      id: 5,
      title: 'ロボット掃除機、ここまで進化しました',
      excerpt: '今はもう「掃除を任せる」時代です。ゴミ捨てからモップ洗いまで、全部やってくれる最新モデル。',
      content: `2026年のロボット掃除機は、ただゴミを吸うだけではありません。お家全体の床をピカピカに保つ、頼もしいパートナーです。

進化したポイント：
- お手入れいらず：ゴミを自動で集めるのはもちろん、モップを洗って乾かすところまで全部やってくれます。
- 障害物をよける：床に置いてあるコードや、ペットの落とし物も、しっかり見つけてよけます。
- お部屋を覚える：お家の間取りを覚えて、汚れやすい場所を重点的に掃除します。

人間がやることは、数ヶ月に一度ゴミ袋を替えたり、お水を足したりするだけ。忙しい毎日の中で、一番助かる家電かもしれません。`,
      date: '2026.01.28',
      category: 'ロボット掃除機',
      image: 'https://picsum.photos/seed/blog5/800/400'
    },
    {
      id: 6,
      title: '明かりの色で、ぐっすり眠れるお部屋作り',
      excerpt: '朝はスッキリ、夜はリラックス。時間に合わせて自動で色が変わる、魔法のようなライト。',
      content: `光の色は、私たちの体調に大きな影響を与えます。最新のスマートライトを使えば、お部屋の雰囲気を自動で整えることができます。

おすすめの使い方：
- 朝：太陽のような白い光で、頭をシャキッとさせます。
- 昼：お仕事や勉強に集中しやすい、明るい白。
- 夜：夕焼けのような温かいオレンジ色で、眠る準備を整えます。

これらが全部自動で切り替わるので、意識しなくても自然な生活リズムが身につきます。`,
      date: '2026.01.20',
      category: '照明・カーテン',
      image: 'https://picsum.photos/seed/blog6/800/400'
    },
    {
      id: 7,
      title: 'キッチンが「献立」を考えてくれる時代に',
      excerpt: '冷蔵庫にあるもので何を作る？オーブンと相談して、失敗なしの料理を楽しもう。',
      content: `毎日の献立作り、大変ですよね。2026年のキッチン家電は、あなたの代わりにメニューを考えてくれます。

こんなことができます：
- 冷蔵庫が中身をチェック：あと何が残っているか、スマホでいつでも確認できます。
- レシピを家電に送る：作りたい料理を選んだら、オーブンに設定を飛ばすだけ。
- 失敗しない調理：火加減や時間を家電が自動で調整してくれるので、誰でも美味しく作れます。

料理が「面倒な家事」から「楽しい趣味」に変わるかもしれません。`,
      date: '2026.01.15',
      category: 'キッチン家電',
      image: 'https://picsum.photos/seed/blog7/800/400'
    },
    {
      id: 8,
      title: '見守りカメラ、プライバシーは大丈夫？',
      excerpt: '「見守りたいけど、見られたくない」。そんな不安を解消する、最新の安心機能をご紹介。',
      content: `お部屋にカメラを置くのは、ちょっと抵抗がありますよね。でも、最新のカメラはプライバシーをしっかり守る工夫がされています。

安心のポイント：
- 物理的なフタ：使わない時はレンズが隠れるので、絶対に映りません。
- お家の中で処理：映像をネットに送らず、カメラの中で判断するので安心です。
- ガッチリガード：特別な暗号を使っているので、他の人に見られる心配はありません。

家族の安全を守りながら、自分たちのプライバシーも大切にできる。そんなカメラが増えています。`,
      date: '2026.01.10',
      category: '見守りカメラ',
      image: 'https://picsum.photos/seed/blog8/800/400'
    },
    {
      id: 9,
      title: '難しい設定はもういらない？最新のつなぎかた',
      excerpt: '昔は必要だった「中継機」がいらなくなるかも。テレビやスピーカーが中心になる未来。',
      content: `スマート家電を始める時、これまでは「ハブ」という専用の機械が必要でした。でも、2026年はもっと簡単になります。

ここが変わりました：
- 家電がハブになる：今持っているテレビやスピーカーが、他の家電をまとめる役割をしてくれます。
- 買ってきて置くだけ：難しい設定なしで、すぐに使い始められるようになっています。
- 壊れにくい：一つの機械が止まっても、他の機械が助けてくれるので安心です。

「難しそう」というイメージはもう古いかもしれません。`,
      date: '2026.01.05',
      category: 'ハブ・プラグ',
      image: 'https://picsum.photos/seed/blog9/800/400'
    },
    {
      id: 10,
      title: 'お家のトラブル、起きる前に防ぎましょう',
      excerpt: '泥棒対策だけじゃない。水漏れや火事、転倒まで見守ってくれる最新センサー。',
      content: `スマートホームのセキュリティは、泥棒を防ぐだけではありません。お家の中の「困った」をいち早く見つけてくれます。

例えばこんなこと：
- 水漏れをキャッチ：お洗濯やお風呂のトラブルをすぐにお知らせします。
- 家族の異変に気づく：カメラを使わずに、誰かが倒れていないかを見守るセンサーもあります。
- 自動で止める：ガス漏れなどを見つけたら、自動で元栓を閉めてくれる連携も可能です。

お家全体があなたを見守ってくれる。そんな安心な暮らしが始まっています。`,
      date: '2026.01.01',
      category: '防犯・センサー',
      image: 'https://picsum.photos/seed/blog10/800/400'
    }
  ]);
ートエアコン',
      image: 'https://picsum.photos/seed/blog2/800/400'
    },
    {
      id: 3,
      title: '賃貸でも諦めない。スマートロック導入の決定版',
      excerpt: '工事不要で設置できる最新モデルを比較。セキュリティと利便性を両立させる、最適な選び方。',
      content: `「賃貸だからスマートロックは無理」というのは過去の話です。2026年現在、既存の鍵に被せるだけで設置できる「後付け型」が市場の主流となっています。

導入のメリット：
- ハンズフリー解錠：買い物帰りで両手が塞がっていても、ドアに近づくだけで解錠。
- ゲストキーの発行：家事代行や友人の訪問時に、時間限定のデジタルキーを送信。
- 閉め忘れ防止：オートロック機能で、外出時の不安を解消。

最新モデルでは、Apple HomeKeyへの対応や、Matter経由での他デバイス連動もスムーズ。退去時の原状回復も簡単なので、一人暮らしの防犯対策としても非常におすすめです。`,
      date: '2026.02.10',
      category: 'スマートロック',
      image: 'https://picsum.photos/seed/blog3/800/400'
    },
    {
      id: 4,
      title: 'Threadメッシュネットワーク：安定した接続の鍵',
      excerpt: 'Wi-Fiの届きにくい場所でも、Threadなら解決。2026年のスマートホーム構築に欠かせない基礎知識。',
      content: `スマートホームデバイスが増えるにつれ、Wi-Fiの混雑や接続切れが問題になっています。その解決策として注目されているのが「Thread」です。

Threadの特徴：
1. メッシュ構造：デバイス同士が網目状につながるため、一部が切れても経路を自動修復。
2. 低消費電力：センサーなどの小型デバイスでも、電池で数年間の稼働が可能。
3. 低遅延：スイッチを押してから電気がつくまでの反応が劇的に速い。

2026年のスマートホーム構築において、ハブや主要デバイスがThreadに対応しているかどうかは、システムの安定性を左右する最も重要なポイントです。`,
      date: '2026.02.05',
      category: '技術解説',
      image: 'https://picsum.photos/seed/blog4/800/400'
    },
    {
      id: 5,
      title: 'ロボット掃除機の進化：水拭きとAI検知の最前線',
      excerpt: 'もはや掃除は「任せる」時代へ。障害物検知と自動メンテナンス機能が劇的に進化した最新3モデルを比較。',
      content: `2026年のロボット掃除機は、単なる「掃除機」を超え、家全体の床管理システムへと進化しました。

進化した3つのポイント：
- メンテナンスフリー：ゴミ収集だけでなく、モップの洗浄・乾燥まで全自動。
- 高度なAI検知：床に置かれたペットの排泄物やケーブルを、ミリ単位で回避。
- 空間認識：部屋の間取りだけでなく、家具の配置や汚れの溜まりやすい場所を特定。

もはや人間が掃除機に触れるのは、数ヶ月に一度のダストバッグ交換や水タンクの補給だけ。忙しい現代人にとって、最も投資価値のある家電と言えるでしょう。`,
      date: '2026.01.28',
      category: 'ロボット掃除機',
      image: 'https://picsum.photos/seed/blog5/800/400'
    },
    {
      id: 6,
      title: 'スマート照明で、暮らしのリズムを整える',
      excerpt: 'サーカディアンリズムに合わせた調光・調色機能。Matter対応照明がもたらす、新しい光の体験。',
      content: `光は私たちの健康と気分に大きな影響を与えます。2026年のスマート照明は、単に明るさを変えるだけでなく、私たちの「体内時計」をサポートします。

サーカディアンリズム照明とは：
- 朝：爽やかな青白い光で、脳と体をスッキリ目覚めさせる。
- 昼：集中力を高める明るい白。
- 夜：夕日のような温かいオレンジ色の光で、睡眠ホルモンの分泌を促す。

Matter対応の照明システムなら、これらを全自動で制御可能。忙しい毎日の中で、光を通じて自然な生活リズムを取り戻すことができます。`,
      date: '2026.01.20',
      category: '照明・カーテン',
      image: 'https://picsum.photos/seed/blog6/800/400'
    },
    {
      id: 7,
      title: '2026年のスマートキッチン：AIが献立から調理まで',
      excerpt: '冷蔵庫の在庫管理から、オーブンとの連携まで。キッチンが「考える」場所へと変わる。',
      content: `キッチンは、家の中で最もテクノロジーの恩恵を受ける場所の一つです。

スマートキッチンの日常：
- 冷蔵庫が在庫を把握し、賞味期限が近い食材を使ったレシピを提案。
- 提案されたレシピは、ワンタップでオーブンやIHクッカーに送信。
- 調理器具は最適な温度と時間を自動設定し、失敗のない調理を実現。

2026年の最新モデルでは、栄養バランスの計算や、ネットスーパーへの自動注文機能も統合。料理は「作業」から「クリエイティブな楽しみ」へと変化しています。`,
      date: '2026.01.15',
      category: 'キッチン家電',
      image: 'https://picsum.photos/seed/blog7/800/400'
    },
    {
      id: 8,
      title: 'プライバシーと利便性の両立：スマートカメラの選び方',
      excerpt: '「見守りたいけど見られたくない」。2026年のカメラが採用するプライバシー保護技術。',
      content: `スマートカメラの導入をためらう最大の理由は「プライバシー」です。しかし、2026年の最新モデルはこの課題に正面から向き合っています。

最新の保護機能：
- 物理シャッター：アプリでオフにすると、レンズが物理的に隠れる仕組み。
- オンデバイス処理：AI解析をクラウドではなくカメラ内部で行い、映像データを外に出さない。
- 暗号化：エンドツーエンドの暗号化により、メーカーですら映像を見ることが不可能。

これらの技術により、家族の安全を守りつつ、自分たちのプライバシーも完全に保護することが可能になっています。`,
      date: '2026.01.10',
      category: '見守りカメラ',
      image: 'https://picsum.photos/seed/blog8/800/400'
    },
    {
      id: 9,
      title: 'スマートホームハブの終焉？2026年の接続事情',
      excerpt: '専用ハブが不要になる未来。テレビやスピーカーが「家の中枢」になる仕組み。',
      content: `かつてスマートホームには、各メーカー専用の「ハブ」が乱立していました。しかし2026年、その姿は大きく変わりました。

ハブの進化：
- 統合：テレビ、スマートスピーカー、Wi-FiルーターがMatterハブ機能を内蔵。
- 透過性：ユーザーはハブの存在を意識することなく、デバイスを追加するだけ。
- 冗長性：家の中に複数のハブが存在することで、ネットワークの信頼性が向上。

「ハブを買う」のではなく「ハブ機能を持った家電を買う」時代。スマートホームの導入障壁は、かつてないほど低くなっています。`,
      date: '2026.01.05',
      category: 'ハブ・プラグ',
      image: 'https://picsum.photos/seed/blog9/800/400'
    },
    {
      id: 10,
      title: '2026年版：スマートホームセキュリティのトレンド',
      excerpt: 'センサーとAIが実現する、一歩先の安心。侵入検知から事故防止まで。',
      content: `セキュリティはスマートホームの原点です。2026年、それは単なる「防犯」から「予兆検知」へと進化しました。

最新トレンド：
- ミリ波レーダー：カメラを使わずに、人の転倒や異常な動きを検知。
- 統合アラート：窓のセンサー、カメラ、照明、スピーカーが連携し、不審者を威嚇。
- 事故防止：水漏れやガス漏れを検知し、自動で元栓を閉める連携。

家全体が一つの生命体のように、住む人を守る。それが2026年のスマートホームセキュリティが目指す姿です。`,
      date: '2026.01.01',
      category: '防犯・センサー',
      image: 'https://picsum.photos/seed/blog10/800/400'
    }
  ]);
  
  const comparatorRef = useRef<HTMLDivElement>(null);

  // Fetch user on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  // Fetch saved comparisons when user changes or modal opens
  useEffect(() => {
    if (user && (view === 'account' || showMyComparisons)) {
      fetch('/api/comparisons')
        .then(res => res.json())
        .then(data => setSavedComparisons(data));
    }
  }, [user, view, showMyComparisons]);

  // Handle sticky header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (comparatorRef.current) {
        const rect = comparatorRef.current.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  // Reset selected products when category changes
  useEffect(() => {
    if (view === 'category') {
      setQuickCompareSelection([]);
    }
  }, [activeCategory, view]);

  const navigateToCategory = (cat: Category) => {
    setActiveCategory(cat);
    setView('category');
    window.scrollTo(0, 0);
  };

  const navigateToBuilder = (products: (Product | null)[]) => {
    setSelectedProducts(products);
    setView('builder');
    window.scrollTo(0, 0);
  };

  const handleProductSelect = (slotIndex: number, productId: string) => {
    const product = activeCategory.products.find(p => p.id === productId) || null;
    const newSelected = [...selectedProducts];
    newSelected[slotIndex] = product;
    setSelectedProducts(newSelected);
  };

  const specKeys = useMemo(() => {
    return Object.keys(activeCategory.specLabels);
  }, [activeCategory]);

  const filteredSpecKeys = useMemo(() => {
    if (!showDifferencesOnly) return specKeys;
    
    return specKeys.filter(key => {
      const activeProducts = selectedProducts.filter((p): p is Product => p !== null);
      if (activeProducts.length < 2) return true;
      
      const firstVal = activeProducts[0].specs[key];
      return activeProducts.some(p => p.specs[key] !== firstVal);
    });
  }, [specKeys, selectedProducts, showDifferencesOnly]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register';
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setShowAuthModal(false);
        setEmail('');
        setPassword('');
      } else {
        setAuthError(data.error);
      }
    } catch (err) {
      setAuthError('Authentication failed.');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    addToast('ログアウトしました');
  };

  const saveComparison = async () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    const productIds = selectedProducts.filter(p => p !== null).map(p => p!.id);
    if (productIds.length < 2) {
      addToast('比較するには2つ以上の製品を選択してください');
      return;
    }
    
    try {
      const res = await fetch('/api/comparisons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryId: activeCategory.id, productIds })
      });
      if (res.ok) {
        addToast('比較を保存しました');
        // Refresh saved comparisons
        const dataRes = await fetch('/api/comparisons');
        const data = await dataRes.json();
        setSavedComparisons(data);
      }
    } catch (err) {
      addToast('保存に失敗しました');
    }
  };

  const deleteComparison = async (id: number) => {
    try {
      const res = await fetch(`/api/comparisons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedComparisons(prev => prev.filter(c => c.id !== id));
      }
    } catch (err) {
      alert('Failed to delete comparison.');
    }
  };

  const loadComparison = (comp: SavedComparison) => {
    const category = CATEGORIES.find(c => c.id === comp.categoryId);
    if (category) {
      setActiveCategory(category);
      const products = comp.productIds.map(id => category.products.find(p => p.id === id) || null);
      // Pad to 3 slots
      while (products.length < 3) products.push(null);
      setSelectedProducts(products.slice(0, 3));
      setShowMyComparisons(false);
      setView('builder');
      window.scrollTo(0, 0);
    }
  };

  const toggleQuickCompare = (productId: string) => {
    setQuickCompareSelection(prev => {
      if (prev.includes(productId)) return prev.filter(id => id !== productId);
      if (prev.length >= 3) return prev;
      return [...prev, productId];
    });
  };

  const quickCompareProducts = useMemo(() => {
    return quickCompareSelection.map(id => activeCategory.products.find(p => p.id === id)!);
  }, [quickCompareSelection, activeCategory]);

  return (
    <div className="min-h-screen bg-transparent text-[#1d1d1f] font-sans selection:bg-slate-200 relative">
      <BackgroundAnimation />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/40 backdrop-blur-3xl border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-4 md:gap-8 flex-shrink-0">
            <button 
              onClick={() => setView('home')}
              className="font-bold text-xl tracking-tighter hover:opacity-70 transition-opacity uppercase whitespace-nowrap"
            >
              SmartHome <span className="text-black/30">2026</span>
            </button>
            <button 
              onClick={() => setView('blog')}
              className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all whitespace-nowrap ${
                view === 'blog' ? 'bg-black text-white' : 'hover:bg-black/5 text-black/40 hover:text-black'
              }`}
            >
              BLOG
            </button>
          </div>

          {/* Desktop Category Menu */}
          <div className="hidden lg:flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {CATEGORIES.map(cat => {
              return (
                <button
                  key={cat.id}
                  onClick={() => navigateToCategory(cat)}
                  className={`flex items-center text-[10px] font-bold uppercase tracking-widest whitespace-nowrap px-4 py-1.5 rounded-full transition-all ${
                    activeCategory.id === cat.id && view === 'category'
                      ? 'bg-black text-white' 
                      : 'hover:bg-black/5 text-black/40 hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('account')}
                  className="hidden md:block text-[10px] font-black uppercase tracking-widest hover:text-black/60 transition-colors whitespace-nowrap"
                >
                  SAVED
                </button>
                <button 
                  onClick={() => setView('account')}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-black/10 transition-all whitespace-nowrap ${view === 'account' ? 'bg-black text-white border-black' : 'hover:bg-black/5'}`}
                >
                  ACCOUNT
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="text-[10px] font-black uppercase tracking-widest px-4 py-1.5 border border-black rounded-full hover:bg-black hover:text-white transition-all whitespace-nowrap"
              >
                LOGIN
              </button>
            )}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap"
            >
              MENU
            </button>
          </div>
        </div>
      </nav>

      {/* Toast Notifications */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1d1d1f] text-white px-6 py-3 rounded-full text-xs font-medium shadow-2xl backdrop-blur-xl"
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[32px] p-10 shadow-2xl overflow-hidden"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-semibold tracking-tight mb-2">
                  {authMode === 'login' ? 'おかえりなさい' : 'アカウント作成'}
                </h2>
                <p className="text-sm text-[#86868b] font-medium">
                  {authMode === 'login' ? '比較を保存して、いつでもチェック。' : '最新のスマート家電情報を手に入れよう。'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                <input 
                  type="email" 
                  placeholder="メールアドレス" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-[#f5f5f7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  required
                />
                <input 
                  type="password" 
                  placeholder="パスワード" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-[#f5f5f7] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all"
                  required
                />
                {authError && <p className="text-red-500 text-[10px] font-bold text-center">{authError}</p>}
                <button className="w-full bg-black text-white py-4 rounded-full font-semibold text-sm hover:bg-[#333333] transition-all">
                  {authMode === 'login' ? 'ログイン' : '登録する'}
                </button>
              </form>

              <div className="mt-8 text-center">
                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-xs font-semibold text-black hover:underline"
                >
                  {authMode === 'login' ? 'アカウントをお持ちでない方はこちら' : 'すでにアカウントをお持ちの方はこちら'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile/Full Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[60] bg-white p-6 md:p-12 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12 max-w-7xl mx-auto w-full">
              <span className="font-semibold text-xl tracking-tight">メニュー</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-black hover:underline"
              >
                閉じる
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 max-w-7xl mx-auto">
              <div>
                <h3 className="text-xs font-semibold text-[#86868b] uppercase tracking-widest mb-8">ナビゲーション</h3>
                <div className="space-y-4">
                  <button onClick={() => { setView('home'); setIsMenuOpen(false); }} className="block text-4xl md:text-6xl font-semibold tracking-tight hover:text-[#86868b] transition-colors">ホーム</button>
                  <button onClick={() => { setView('blog'); setIsMenuOpen(false); }} className="block text-4xl md:text-6xl font-semibold tracking-tight hover:text-[#86868b] transition-colors">ブログ</button>
                  
                  <div className="pt-8">
                    <h3 className="text-xs font-semibold text-[#86868b] uppercase tracking-widest mb-6">カテゴリー</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {CATEGORIES.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat);
                            setIsMenuOpen(false);
                            setView('category');
                          }}
                          className="text-xl md:text-2xl font-semibold tracking-tight hover:text-black transition-colors text-left"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-12">
                <div>
                  <h3 className="text-xs font-semibold text-[#86868b] uppercase tracking-widest mb-8">アカウント</h3>
                  <div className="space-y-4 text-xl md:text-2xl font-semibold tracking-tight">
                    {user ? (
                      <>
                        <button onClick={() => { setView('account'); setIsMenuOpen(false); }} className="block hover:text-black">保存した比較</button>
                        <button onClick={handleLogout} className="block hover:text-black/60">ログアウト</button>
                      </>
                    ) : (
                      <button onClick={() => { setShowAuthModal(true); setIsMenuOpen(false); }} className="block hover:text-black">ログイン / 新規登録</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Compare Modal */}
      <AnimatePresence>
        {showQuickCompare && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickCompare(false)}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative bg-white w-full max-w-5xl rounded-[32px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-8 border-b border-[#d2d2d7] flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">クイック比較</h2>
                  <p className="text-xs text-[#86868b] font-medium">{quickCompareSelection.length}製品を選択中</p>
                </div>
                <button 
                  onClick={() => setShowQuickCompare(false)}
                  className="text-sm font-semibold text-black hover:underline"
                >
                  閉じる
                </button>
              </div>

              <div className="flex-1 overflow-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {quickCompareSelection.map(id => {
                    const product = activeCategory.products.find(p => p.id === id);
                    if (!product) return null;
                    return (
                      <div key={id} className="space-y-8">
                        <div className="aspect-square rounded-2xl overflow-hidden border border-[#d2d2d7] bg-[#f5f5f7]">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-[#86868b] mb-1">{product.brand}</p>
                          <h3 className="text-xl font-semibold tracking-tight mb-2">{product.name}</h3>
                          <p className="text-lg font-semibold">¥{product.price.toLocaleString()}</p>
                        </div>
                        <div className="space-y-4">
                          {Object.entries(product.specs).map(([key, val]) => (
                            <div key={key} className="py-3 border-b border-[#f5f5f7]">
                              <span className="text-[10px] font-semibold text-[#86868b] block mb-1 uppercase tracking-wider whitespace-nowrap overflow-x-auto no-scrollbar">{activeCategory.specLabels[key]}</span>
                              <span className="text-sm font-medium text-[#1d1d1f] whitespace-nowrap overflow-x-auto no-scrollbar block">
                                {typeof val === 'boolean' ? (val ? '対応' : '-') : val}
                              </span>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => {
                            addToast(`${product.name}をカートに追加しました`);
                            setShowQuickCompare(false);
                          }}
                          className="w-full bg-black text-white py-4 rounded-full font-semibold text-sm hover:bg-[#333333] transition-all whitespace-nowrap"
                        >
                          購入する
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="p-8 border-t border-[#d2d2d7] bg-[#f5f5f7] flex justify-center">
                <button 
                  onClick={() => {
                    const products = quickCompareSelection.map(id => activeCategory.products.find(p => p.id === id) || null);
                    while (products.length < 3) products.push(null);
                    navigateToBuilder(products);
                    setShowQuickCompare(false);
                  }}
                  className="bg-[#1d1d1f] text-white px-10 py-4 rounded-full font-semibold text-sm hover:bg-black transition-all"
                >
                  詳細な比較ビルダーで開く
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <section className="max-w-7xl mx-auto px-6 mb-32 text-center pt-20">
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-8 text-center">
                  自分にぴったりの、<br />
                  <span className="text-[#86868b]">スマート家電を見つけよう。</span>
                </h1>
                <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-center">
                  たくさんの製品の中から、あなたの暮らしを便利にする一台を。かんたんに比べて、理想の毎日を始めましょう。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button 
                    onClick={() => navigateToCategory(CATEGORIES[0])}
                    className="bg-black text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#333333] transition-all shadow-sm whitespace-nowrap"
                  >
                    比較を開始する
                  </button>
                </div>
              </section>

              {/* Category Grid */}
              <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                  <h2 className="text-3xl font-semibold tracking-tight">アイテムから選ぶ</h2>
                  <p className="text-sm font-medium text-[#86868b]">{CATEGORIES.length}つの種類から選べます</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                  {CATEGORIES.map(cat => {
                    return (
                      <button
                        key={cat.id}
                        onClick={() => navigateToCategory(cat)}
                        className="group bg-white/60 backdrop-blur-md p-8 rounded-[32px] border border-[#d2d2d7] hover:border-[#86868b] transition-all text-center shadow-sm hover:shadow-md overflow-hidden"
                      >
                        <div className="text-xs font-semibold text-[#86868b] mb-6 transition-colors whitespace-nowrap overflow-x-auto no-scrollbar">
                          {cat.id.substring(0, 3).toUpperCase()}
                        </div>
                        <div className="font-semibold text-lg tracking-tight mb-2 whitespace-nowrap overflow-x-auto no-scrollbar">{cat.name}</div>
                        <div className="text-xs font-medium text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {cat.products.length} モデル
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>


            </motion.div>
          )}

          {view === 'category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Header */}
              <section className="max-w-7xl mx-auto px-6 mb-20 pt-20">
                <button 
                  onClick={() => setView('home')}
                  className="text-sm font-medium text-black mb-8 hover:underline transition-all flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"></path></svg>
                  ホーム
                </button>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 text-center">{activeCategory.name}</h1>
                <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto font-medium leading-relaxed text-center">
                  {activeCategory.products.length}製品の最新モデルをラインナップ。
                  気になる製品を選択して、クイック比較または詳細比較を開始しましょう。
                </p>
              </section>

              {/* Category Listing & Quick Compare Selection */}
              <section className="max-w-7xl mx-auto px-6 mb-40">
                <div className="flex flex-col md:flex-row justify-between items-baseline gap-8 mb-20">
                  <div>
                    <h2 className="text-3xl font-semibold tracking-tight mb-2">製品ラインナップ</h2>
                    <p className="text-sm font-medium text-[#86868b]">最大3つまで選択してクイック比較</p>
                  </div>
                  {quickCompareSelection.length >= 2 && (
                    <button 
                      onClick={() => setShowQuickCompare(true)}
                      className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-full font-semibold text-sm hover:bg-[#333333] transition-all shadow-sm"
                    >
                      クイック比較 ({quickCompareSelection.length}製品)
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {activeCategory.products.map(product => {
                    const isSelected = quickCompareSelection.includes(product.id);
                    return (
                      <div 
                        key={product.id}
                        className={`bg-white/70 backdrop-blur-md p-8 rounded-[32px] border transition-all duration-500 shadow-sm hover:shadow-lg ${
                          isSelected ? 'border-black ring-4 ring-black/10' : 'border-[#d2d2d7] hover:border-[#86868b]'
                        }`}
                      >
                        <div className="relative aspect-square mb-10 overflow-hidden rounded-[32px]">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                          <button 
                            onClick={() => toggleQuickCompare(product.id)}
                            className={`absolute top-4 right-4 px-4 py-2 rounded-full flex items-center justify-center transition-all shadow-sm font-semibold text-[10px] ${
                              isSelected ? 'bg-[#1d1d1f] text-white' : 'bg-white/90 backdrop-blur-sm text-[#1d1d1f] hover:bg-white'
                            }`}
                          >
                            {isSelected ? '選択中' : '比較に追加'}
                          </button>
                        </div>
                        <div className="flex justify-between items-start mb-8">
                          <div>
                            <h3 className="font-semibold text-2xl mb-1 tracking-tight">{product.name}</h3>
                            <p className="text-xs text-[#86868b] font-medium">{product.brand}</p>
                          </div>
                          <div className="text-xl font-semibold tracking-tight">¥{product.price.toLocaleString()}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-10">
                          {Object.entries(product.specs).slice(0, 4).map(([key, val]) => (
                            <div key={key} className="text-[10px] bg-[#f5f5f7] px-5 py-4 rounded-2xl">
                              <span className="text-[#86868b] block mb-1 font-semibold">{activeCategory.specLabels[key]}</span>
                              <span className="font-semibold truncate block text-xs text-[#1d1d1f]">
                                {typeof val === 'boolean' ? (val ? '対応' : '-') : val}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button 
                            onClick={() => navigateToBuilder([product, activeCategory.products.find(p => p.id !== product.id) || null, null])}
                            className="w-full py-3 rounded-full bg-[#f5f5f7] text-[#1d1d1f] font-semibold text-xs hover:bg-[#e8e8ed] transition-all whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            比較する
                          </button>
                          <button 
                            onClick={() => addToast(`${product.name}をカートに追加しました`)}
                            className="w-full py-3 rounded-full bg-black text-white font-semibold text-xs hover:bg-[#333333] transition-all whitespace-nowrap overflow-hidden text-ellipsis"
                          >
                            購入
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'builder' && (
            <motion.div
              key="builder"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              {/* Builder Header */}
              <section className="max-w-7xl mx-auto px-6 mb-20 pt-20">
                <button 
                  onClick={() => setView('category')}
                  className="text-sm font-medium text-black mb-8 hover:underline transition-all flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"></path></svg>
                  {activeCategory.name}
                </button>
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8 text-center">機種を比較する。</h1>
                <p className="text-lg md:text-xl text-[#86868b] max-w-2xl mx-auto font-medium leading-relaxed text-center">
                  {activeCategory.name}のスペックを徹底的に比較します。
                  Matter対応状況やAI機能など、2026年の重要項目をチェックしましょう。
                </p>
              </section>

              {/* Comparison Builder */}
              <section ref={comparatorRef} className="max-w-7xl mx-auto px-6 scroll-mt-24 mb-64">
                <div className="bg-white/80 backdrop-blur-xl rounded-[48px] shadow-xl border border-[#d2d2d7] overflow-hidden">
                  
                  {/* Selection Bar / Sticky Header */}
                  <div className={`transition-all duration-700 ${isSticky ? 'fixed top-16 left-0 w-full bg-white/80 backdrop-blur-2xl z-40 border-b border-[#d2d2d7] py-6 shadow-sm' : 'py-32'}`}>
                    <div className="max-w-7xl mx-auto px-6 overflow-x-auto no-scrollbar">
                      <div className="grid grid-cols-4 gap-8 md:gap-16 min-w-[800px] md:min-w-0">
                        <div className={`flex flex-col justify-center ${isSticky ? 'hidden md:flex' : ''}`}>
                          {!isSticky && (
                            <div className="flex flex-col gap-4 mb-16">
                              <button 
                                onClick={() => setShowDifferencesOnly(!showDifferencesOnly)}
                                className={`px-8 py-3 rounded-full text-xs font-semibold transition-all w-fit ${
                                  showDifferencesOnly 
                                    ? 'bg-[#1d1d1f] text-white' 
                                    : 'bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed]'
                                }`}
                              >
                                {showDifferencesOnly ? 'すべて表示' : '違いのみ表示'}
                              </button>
                              <button 
                                onClick={saveComparison}
                                className="px-8 py-3 rounded-full text-xs font-semibold bg-[#1d1d1f] text-white hover:bg-black transition-all flex items-center justify-center gap-2 w-fit"
                              >
                                比較を保存
                              </button>
                            </div>
                          )}
                          <h2 className={`font-semibold tracking-tight text-[#1d1d1f] whitespace-nowrap ${isSticky ? 'text-xs' : 'text-2xl md:text-4xl'}`}>
                            {activeCategory.name}
                          </h2>
                        </div>

                        {selectedProducts.map((product, idx) => (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div className={`relative transition-all duration-700 ${isSticky ? 'w-12 h-12 md:w-20 md:h-20 mb-3' : 'w-32 h-32 md:w-72 md:h-72 mb-12 md:mb-20'}`}>
                              {product ? (
                                <motion.img
                                  key={product.id}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover rounded-3xl shadow-sm border border-[#d2d2d7]"
                                />
                              ) : (
                                <div className="w-full h-full bg-[#f5f5f7] rounded-3xl flex items-center justify-center border border-[#d2d2d7] text-[10px] font-bold text-[#86868b] whitespace-nowrap">
                                  製品を選択
                                </div>
                              )}
                            </div>
                            
                            <div className="w-full px-2">
                              <div className="relative group mb-4">
                                <select
                                  value={product?.id || ''}
                                  onChange={(e) => handleProductSelect(idx, e.target.value)}
                                  className={`w-full appearance-none bg-transparent font-semibold text-center cursor-pointer focus:outline-none transition-all text-[#1d1d1f] border-b-2 border-transparent hover:border-[#d2d2d7] pb-2 whitespace-nowrap ${
                                    isSticky ? 'text-[10px] md:text-sm' : 'text-sm md:text-2xl mb-2'
                                  }`}
                                >
                                  <option value="" disabled>選択してください</option>
                                  {activeCategory.products.map(p => (
                                    <option key={p.id} value={p.id}>{p.name}</option>
                                  ))}
                                </select>
                              </div>
                              
                              {product && (
                                <div className={`${isSticky ? 'mt-2' : 'mt-6 md:mt-12'}`}>
                                  {!isSticky && <div className="text-lg md:text-2xl font-semibold text-[#1d1d1f] mb-6 whitespace-nowrap">¥{product.price.toLocaleString()}</div>}
                                  <button 
                                    onClick={() => addToast(`${product.name}をカートに追加しました`)}
                                    className={`bg-black text-white rounded-full font-bold hover:bg-[#333333] transition-all flex items-center justify-center gap-2 mx-auto whitespace-nowrap ${isSticky ? 'px-4 py-1.5 text-[10px]' : 'px-10 py-3.5 text-xs md:text-sm'}`}
                                  >
                                    <span>購入</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Comparison Table */}
                  <div className="pb-64">
                    {/* Desktop Table */}
                    <div className="hidden md:block px-32">
                      <div className="space-y-0">
                        {filteredSpecKeys.map((key) => (
                          <div key={key} className="grid grid-cols-4 gap-16 py-20 border-b border-[#d2d2d7] group transition-colors overflow-x-auto no-scrollbar">
                            <div className="flex items-start pt-2 min-w-[150px]">
                              <span className="text-base md:text-lg font-semibold text-[#1d1d1f] leading-tight opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">{activeCategory.specLabels[key]}</span>
                            </div>
                            
                            {selectedProducts.map((product, idx) => (
                              <div key={idx} className="flex items-start justify-center text-center px-6 pt-2 min-w-[150px]">
                                {product ? (
                                  <div className="text-lg md:text-xl text-[#1d1d1f] font-medium leading-relaxed whitespace-nowrap">
                                    {typeof product.specs[key] === 'boolean' ? (
                                      product.specs[key] ? (
                                        <div className="flex justify-center">
                                          <svg className="w-8 h-8 text-[#1d1d1f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 13 4 4L19 7"></path></svg>
                                        </div>
                                      ) : (
                                        <div className="text-[#d2d2d7]">—</div>
                                      )
                                    ) : (
                                      product.specs[key]
                                    )}
                                  </div>
                                ) : (
                                  <div className="text-[#d2d2d7]">—</div>
                                )}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mobile Table */}
                    <div className="md:hidden">
                      <div className="overflow-x-auto no-scrollbar">
                        <div className="min-w-[800px]">
                          {filteredSpecKeys.map((key) => (
                            <div key={key} className="grid grid-cols-4 gap-8 py-16 border-b border-[#d2d2d7] px-8">
                              <div className="sticky left-0 bg-white/95 backdrop-blur-sm z-10 pr-6 flex items-start">
                                <span className="text-xs font-semibold text-[#1d1d1f] leading-tight opacity-60 whitespace-nowrap">{activeCategory.specLabels[key]}</span>
                              </div>
                              
                              {selectedProducts.map((product, idx) => (
                                <div key={idx} className="flex items-start justify-center text-center">
                                  {product ? (
                                    <div className="text-xs text-[#1d1d1f] font-medium whitespace-nowrap">
                                      {typeof product.specs[key] === 'boolean' ? (
                                        product.specs[key] ? (
                                          <svg className="w-5 h-5 text-[#1d1d1f] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="m5 13 4 4L19 7"></path></svg>
                                        ) : (
                                          <div className="text-[#d2d2d7]">—</div>
                                        )
                                      ) : (
                                        product.specs[key]
                                      )}
                                    </div>
                                  ) : (
                                    <div className="text-[#d2d2d7]">—</div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'blog' && (
            <motion.div
              key="blog"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="max-w-7xl mx-auto px-6 pt-20 pb-40">
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
                  <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">ブログ</h1>
                  <p className="text-sm font-medium text-[#86868b]">最新のスマート家電トレンドを解説</p>
                </div>

                <div className="grid grid-cols-1 gap-12">
                  {blogPosts.map(post => (
                    <div key={post.id} className="group cursor-pointer bg-white/70 backdrop-blur-md rounded-[32px] overflow-hidden border border-[#d2d2d7] hover:border-[#86868b] transition-all flex flex-col md:flex-row shadow-sm hover:shadow-xl">
                      <div className="md:w-1/2 aspect-video md:aspect-auto overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <div className="md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-xs font-semibold text-[#86868b]">{post.date}</span>
                          <span className="w-1 h-1 bg-[#d2d2d7] rounded-full"></span>
                          <span className="text-xs font-semibold text-black">{post.category}</span>
                        </div>
                        <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-6 leading-tight group-hover:text-black transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-[#86868b] font-medium leading-relaxed mb-8">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-6">
                          <button 
                            onClick={() => {
                              setSelectedBlogPost(post);
                              setView('blog-post');
                              window.scrollTo(0, 0);
                            }}
                            className="text-sm font-semibold text-black hover:underline transition-all whitespace-nowrap"
                          >
                            記事を読む
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              const cat = CATEGORIES.find(c => c.name === post.category) || CATEGORIES[0];
                              navigateToCategory(cat);
                            }}
                            className="text-sm font-semibold text-[#1d1d1f] hover:underline transition-all whitespace-nowrap"
                          >
                            関連製品を比較
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {view === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="max-w-4xl mx-auto px-6 pt-32 pb-64">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <h1 className="text-4xl font-semibold tracking-tight mb-2 whitespace-nowrap">アカウント</h1>
                    <p className="text-lg text-[#86868b] font-medium whitespace-nowrap">{user?.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-3 bg-[#f5f5f7] text-[#1d1d1f] hover:bg-[#e8e8ed] rounded-full text-xs font-semibold transition-all whitespace-nowrap"
                  >
                    ログアウト
                  </button>
                </div>

                <div className="bg-white/70 backdrop-blur-md rounded-[32px] p-12 border border-[#d2d2d7] shadow-sm">
                  <h2 className="text-2xl font-semibold tracking-tight mb-12">
                    保存した比較
                  </h2>
                  <div className="space-y-6">
                    {savedComparisons.length === 0 ? (
                      <div className="text-center py-24">
                        <div className="text-4xl font-semibold text-[#86868b] mb-6 tracking-tight">空です</div>
                        <p className="text-[#86868b] font-medium mb-8">保存された比較はありません。</p>
                        <button 
                          onClick={() => setView('home')}
                          className="px-8 py-4 bg-black text-white rounded-full text-sm font-semibold hover:bg-[#333333] transition-all"
                        >
                          比較を始める
                        </button>
                      </div>
                    ) : (
                      savedComparisons.map(comp => {
                        const category = CATEGORIES.find(c => c.id === comp.categoryId);
                        return (
                          <div key={comp.id} className="flex items-center justify-between p-8 bg-[#f5f5f7] rounded-[24px] group hover:bg-[#e8e8ed] transition-all border border-transparent">
                            <div className="flex items-center gap-8">
                              <div className="w-16 h-16 bg-white rounded-[16px] flex items-center justify-center shadow-sm border border-[#d2d2d7] flex-shrink-0">
                                <div className="text-xl font-semibold tracking-tight whitespace-nowrap">
                                  {category?.name.charAt(0)}
                                </div>
                              </div>
                              <div>
                                <div className="text-xl font-semibold tracking-tight mb-1 whitespace-nowrap">{category?.name}</div>
                                <div className="text-xs text-[#86868b] font-medium whitespace-nowrap">
                                  {new Date(comp.createdAt).toLocaleDateString()} • {comp.productIds.length} 製品
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                              <button 
                                onClick={() => loadComparison(comp)}
                                className="px-6 py-3 bg-black text-white rounded-full text-xs font-semibold hover:bg-[#333333] transition-all whitespace-nowrap"
                              >
                                開く
                              </button>
                              <button 
                                onClick={() => deleteComparison(comp.id)}
                                className="px-6 py-3 bg-white border border-[#d2d2d7] text-[#1d1d1f] rounded-full text-xs font-semibold hover:bg-[#f5f5f7] transition-all whitespace-nowrap"
                              >
                                削除
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'blog-post' && selectedBlogPost && (
            <motion.div
              key="blog-post"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="max-w-4xl mx-auto px-6 pt-20 pb-40">
                <button 
                  onClick={() => setView('blog')}
                  className="mb-12 text-sm font-semibold text-black hover:underline flex items-center gap-2"
                >
                  ← ブログ一覧に戻る
                </button>
                <div className="mb-12">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-xs font-semibold text-[#86868b]">{selectedBlogPost.date}</span>
                    <span className="w-1 h-1 bg-[#d2d2d7] rounded-full"></span>
                    <span className="text-xs font-semibold text-black">{selectedBlogPost.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-semibold tracking-tight mb-12 leading-tight">
                    {selectedBlogPost.title}
                  </h1>
                  <div className="aspect-video rounded-[32px] overflow-hidden mb-12 border border-[#d2d2d7]">
                    <img src={selectedBlogPost.image} alt={selectedBlogPost.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="prose prose-lg max-w-none">
                    {selectedBlogPost.content.split('\n').map((line: string, i: number) => (
                      <p key={i} className="text-[#1d1d1f] text-lg leading-relaxed mb-6 font-medium">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="pt-20 border-t border-[#d2d2d7]">
                  <h3 className="text-xl font-semibold mb-8">関連カテゴリーをチェック</h3>
                  <button 
                    onClick={() => {
                      const cat = CATEGORIES.find(c => c.name === selectedBlogPost.category) || CATEGORIES[0];
                      navigateToCategory(cat);
                    }}
                    className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:opacity-80 transition-all"
                  >
                    {selectedBlogPost.category} の製品を比較する
                  </button>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-black/5 py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-24 mb-32">
            <div className="col-span-2">
              <div className="text-2xl font-black uppercase tracking-tighter mb-8">SMARTHOME<br />COMPARE 2026</div>
              <p className="text-black/40 max-w-sm font-medium leading-relaxed">
                最新の家電をもっと身近に。便利なアイテムを組み合わせて、毎日を楽しく快適にしましょう。
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-black/30">カテゴリー</h4>
              <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-black/60">
                {CATEGORIES.map(c => <li key={c.id}><button onClick={() => { setView('category'); setActiveCategory(c); }} className="hover:text-black transition-colors">{c.name}</button></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest mb-10 text-black/30">リソース</h4>
              <ul className="space-y-6 text-[11px] font-black uppercase tracking-widest text-black/60">
                <li><a href="#" className="hover:text-black transition-colors">MATTER ガイド</a></li>
                <li><a href="#" className="hover:text-black transition-colors">THREAD メッシュ</a></li>
                <li><a href="#" className="hover:text-black transition-colors">API アクセス</a></li>
                <li><a href="#" className="hover:text-black transition-colors">サポート</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-black uppercase tracking-widest text-black/30">
            <div>© 2026 SMARTHOME COMPARE. 無断複写・転載を禁じます。</div>
            <div className="flex gap-12">
              <a href="#" className="hover:text-black transition-colors">プライバシー</a>
              <a href="#" className="hover:text-black transition-colors">利用規約</a>
              <a href="#" className="hover:text-black transition-colors">サイトマップ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
