export const categories = [
  "Development Board",
  "Sensor",
  "Display",
  "Motors",
  "Power",
  "Wireless",
  "Cellular",
  "RF Antenna",
  "Memory",
  "Supplier Brand",
  "Robotics Project",
  "Tools & Soldering",
  "Wiring & Breadboards",
  "Motor Drivers",
  "Batteries & Power Management"
];

export const products = [
  // --- DEVELOPMENT BOARDS ---
  {
    id: "DEN101",
    name: "ESP32 Dev Kit V1",
    slug: "esp32-dev-kit-v1",
    category: "Development Board",
    shortDescription: "WiFi + Bluetooth development board for IoT, robotics and automation projects",
    price: 400.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F21-6.jpg&w=1920&q=90",
    specifications: { partNumber: "ESP-WROOM-32" }
  },
  {
    id: "DEN102",
    name: "ESP32-S3 Dev Board",
    slug: "esp32-s3-dev-board",
    category: "Development Board",
    shortDescription: "AI-ready ESP32 board with WiFi, Bluetooth and USB support",
    price: 900.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F07%2F16-2.jpg&w=1920&q=90",
    specifications: { partNumber: "ESP32-S3-WROOM-1" }
  },
  {
    id: "DEN103",
    name: "Arduino Uno R3",
    slug: "arduino-uno-r3",
    category: "Development Board",
    shortDescription: "ATmega328P based development board for electronics learning and prototyping",
    price: 300.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2015%2F11%2F4-1.jpg&w=1920&q=90",
    specifications: { partNumber: "UNO R3" }
  },
  {
    id: "DEN104",
    name: "Arduino Nano",
    slug: "arduino-nano",
    category: "Development Board",
    shortDescription: "Compact Arduino-compatible microcontroller board",
    price: 200.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F09%2FR163977_4.jpg&w=1920&q=90",
    specifications: { partNumber: "Nano V3.0" }
  },
  {
    id: "DEN105",
    name: "NodeMCU ESP8266",
    slug: "nodemcu-esp8266",
    category: "Development Board",
    shortDescription: "WiFi-enabled board for IoT and smart device projects",
    price: 238.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F06%2Fss.jpg&w=1920&q=90",
    specifications: { partNumber: "ESP-12E" }
  },
  {
    id: "DEN106",
    name: "Raspberry Pi Pico",
    slug: "raspberry-pi-pico",
    category: "Development Board",
    shortDescription: "Dual-core ARM-based microcontroller development board",
    price: 980.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F11%2F5-15.jpg&w=1920&q=90",
    specifications: { partNumber: "RP2040" }
  },

  // --- SENSORS ---
  {
    id: "DEN107",
    name: "HC-SR04 Ultrasonic Sensor",
    slug: "hc-sr04-ultrasonic-sensor",
    category: "Sensor",
    shortDescription: "Non-contact distance measurement sensor",
    price: 75.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F11%2Fbracket-para-sensor-ultrasonico.jpg&w=1920&q=90",
    specifications: { partNumber: "HC-SR04" }
  },
  {
    id: "DEN108",
    name: "DHT-11 Temperature And Humidity Sensor Module",
    slug: "dht-11-sensor",
    category: "Sensor",
    shortDescription: "Temperature and humidity sensor",
    price: 52.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F11%2FDHT11-Temperature-And-Humidity-Sensor-Module-1.jpg&w=1920&q=90",
    specifications: { partNumber: "DHT11" }
  },
  {
    id: "DEN109",
    name: "MQ 135 Air/Gas Detector Sensor Module",
    slug: "mq-135-sensor",
    category: "Sensor",
    shortDescription: "Air quality monitoring sensor",
    price: 199.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2Fmq-135-air-quality-detector-sensor-module-arduino-iot-littlecraft-1611-20-littlecraft%407-1.jpg&w=1920&q=90",
    specifications: { partNumber: "MQ135" }
  },
  {
    id: "DEN110",
    name: "IR Obstacle Avoidance Sensor Module",
    slug: "ir-obstacle-avoidance-sensor",
    category: "Sensor",
    shortDescription: "IR Sensor for obstacle detection",
    price: 75.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F01%2FIR-sensor-Module-2.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN111",
    name: "HC-SR501 PIR Motion Detector Sensor Module",
    slug: "hc-sr501-pir-sensor",
    category: "Sensor",
    shortDescription: "PIR motion detection sensor",
    price: 70.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F04%2F1pcs-HC-SR505-font-b-Mini-b-font-Infrared-font-b-PIR-b-font-Motion-font.jpg&w=1920&q=90",
    specifications: { partNumber: "HC-SR501" }
  },
  {
    id: "DEN112",
    name: "Digital Sensor TTP223B Module Capacitive Touch",
    slug: "ttp223b-touch-sensor",
    category: "Sensor",
    shortDescription: "Capacitive touch switch sensor module",
    price: 35.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F06%2F2-9.jpg&w=1920&q=90",
    specifications: { partNumber: "TTP223B" }
  },
  {
    id: "DEN156",
    name: "RGB LED Module for Boards Compatible with Arduino",
    slug: "rgb-led-module-arduino",
    category: "Sensor",
    shortDescription: "RGB LED Module for boards compatible with Arduino",
    price: 34.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F11%2Fimgi_199_B19x8jES.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN157",
    name: "Laser Sensor Module 650NM 5V",
    slug: "laser-sensor-module-650nm-5v",
    category: "Sensor",
    shortDescription: "Laser Sensor Module 650NM 5V",
    price: 55.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2018%2F10%2F9.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },

  // --- DISPLAYS ---
  {
    id: "DEN113",
    name: "0.96 OLED Display",
    slug: "0-96-oled-display",
    category: "Display",
    shortDescription: "0.96 inch OLED display module",
    price: 220.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F01%2F6.jpg&w=1920&q=90",
    specifications: { partNumber: "SDT096" }
  },
  {
    id: "DEN114",
    name: "0.91 OLED Display",
    slug: "0-91-oled-display",
    category: "Display",
    shortDescription: "0.91 inch OLED display module",
    price: 210.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F11%2F64.jpg&w=1920&q=90",
    specifications: { partNumber: "SDT091" }
  },
  {
    id: "DEN115",
    name: "4.3 Inch TFT LCD Display (480x272) No Touch",
    slug: "4-3-inch-tft-lcd-display-480x272",
    category: "Display",
    shortDescription: "4.3 inch TFT LCD Module Display, 480x272 Dot, Serial RGB",
    price: 1089.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F02%2F17-3.jpg&w=1920&q=90",
    specifications: { partNumber: "SDT04302T-A40" }
  },
  {
    id: "DEN116",
    name: "7.0 Inch TFT LCD Display (800x480) No Touch",
    slug: "7-0-inch-tft-lcd-display-800x480",
    category: "Display",
    shortDescription: "7 inch TFT LCD Module Display, 800x480 Dot, Serial RGB",
    price: 1600.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F01%2F1855142Ex2.jpg&w=1920&q=90",
    specifications: { partNumber: "SDT07002N-A40" }
  },
  {
    id: "DEN117",
    name: "10.1 Inch TFT LCD Display (1024x600) No Touch",
    slug: "10-1-inch-tft-lcd-display-1024x600",
    category: "Display",
    shortDescription: "10.1inch TFT LCD Module Display, 1024x600 Dot",
    price: 2500.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F10%2F3-8.jpg&w=1920&q=90",
    specifications: { partNumber: "SDT10101N-A60" }
  },
  {
    id: "DEN118",
    name: "Yellow-Green 16x2 LCD Display Module",
    slug: "yellow-green-16x2-lcd",
    category: "Display",
    shortDescription: "16x2 Character LCD Module Series | 16x2 Character Display",
    price: 175.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F01%2F8-14.jpg&w=1920&q=90",
    specifications: { partNumber: "SDCB1602-01" }
  },
  {
    id: "DEN119",
    name: "Blue-White 16x2 LCD Display Module",
    slug: "blue-white-16x2-lcd",
    category: "Display",
    shortDescription: "16x2 Character LCD Module Series | 16x2 Character Display",
    price: 185.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F12%2F9-2.jpg&w=1920&q=90",
    specifications: { partNumber: "SDCB1602-02" }
  },

  // --- SUPPLIER BRAND ---
  {
    id: "DEN138",
    name: "STONE HMI Display - 4.3 inch Resistive Touch",
    slug: "stone-hmi-display-4-3-inch",
    category: "Supplier Brand",
    shortDescription: "4.3-inch 480x272 industrial class TFT LCD Module Display",
    price: 2700.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F2-63.jpg&w=1920&q=90",
    specifications: { partNumber: "STWI043WT-01" }
  },
  {
    id: "DEN139",
    name: "STONE HMI Display - 7.0 inch Resistive Touch",
    slug: "stone-hmi-display-7-0-inch",
    category: "Supplier Brand",
    shortDescription: "7-inch 800x480 industrial class TFT LCD Module Display",
    price: 2970.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F309.png&w=1920&q=90",
    specifications: { partNumber: "STWI070WT-01" }
  },
  {
    id: "DEN140",
    name: "STONE HMI Display - 10.1 inch Resistive Touch",
    slug: "stone-hmi-display-10-1-inch",
    category: "Supplier Brand",
    shortDescription: "10.1-inch 1024x600 industrial class TFT LCD Module Display",
    price: 5132.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F311.png&w=1920&q=90",
    specifications: { partNumber: "STWI101WT-01" }
  },
  {
    id: "DEN141",
    name: "DWIN HMI Display - 4.3 inch Resistive Touch",
    slug: "dwin-hmi-display-4-3-inch",
    category: "Supplier Brand",
    shortDescription: "4.3 Inch 480x272 TTL/RS232 HMI LCD Display Resistive Touch 16MB Flash Buzzer SD interface",
    price: 1800.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2021%2F12%2F1087832.png&w=1920&q=90",
    specifications: { partNumber: "DMG48270C043_04WTR" }
  },
  {
    id: "DEN142",
    name: "DWIN HMI Display - 7.0 inch Resistive Touch",
    slug: "dwin-hmi-display-7-0-inch",
    category: "Supplier Brand",
    shortDescription: "7.0 Inch 800x480 RS232 HMI LCD Display Resistive Touch 16MB Flash SD interface Buzzer",
    price: 2600.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F05%2FR131936.png&w=1920&q=90",
    specifications: { partNumber: "DMG80480C070_04WTR" }
  },
  {
    id: "DEN143",
    name: "DWIN HMI Display - 10.1 inch Capacitive Touch",
    slug: "dwin-hmi-display-10-1-inch",
    category: "Supplier Brand",
    shortDescription: "10.1 Inch 1024x600 IPS TTL/RS232 HMI LCD Display Capacitive Touch 16MB Flash Buzzer SD interface",
    price: 5800.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2021%2F12%2F1087824-3.jpg&w=1920&q=90",
    specifications: { partNumber: "DMG10600C101_03WTC" }
  },

  // --- MOTORS ---
  {
    id: "DEN120",
    name: "SG90 Servo",
    slug: "sg90-servo",
    category: "Motors",
    shortDescription: "Lightweight servo motor for robotics",
    price: 110.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2Frobu-3-10.jpg&w=1920&q=90",
    specifications: { partNumber: "SG90" }
  },
  {
    id: "DEN121",
    name: "MG995 Gear Servo Motor",
    slug: "mg995-gear-servo",
    category: "Motors",
    shortDescription: "Tower Pro MG995 Plastic Gear Servo Motor (180° Rotation)",
    price: 350.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2Ftower-pro-mg995-13kg013s-60g-standard-servo.jpg&w=1920&q=90",
    specifications: { partNumber: "MG995" }
  },
  {
    id: "DEN122",
    name: "150 RPM Bo Motor Straight Dual Shaft",
    slug: "150-rpm-bo-motor",
    category: "Motors",
    shortDescription: "The 150RPM Dual Shaft BO Motor Plastic Gear Motor – straight motor gives good torque",
    price: 75.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2018%2F08%2F300-RPM-L-Shape-BO-Motor-1.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },

  // --- MOTOR DRIVERS ---
  {
    id: "DEN158",
    name: "L298N 2A Based Motor Driver Module",
    slug: "l298n-2a-motor-driver-module",
    category: "Motor Drivers",
    shortDescription: "L298N 2A Based Motor Driver is a high power motor driver perfect for driving DC Motors and Stepper Motors",
    price: 135.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2FB1.jpg&w=1920&q=90",
    specifications: { partNumber: "L298N" }
  },
  {
    id: "DEN159",
    name: "L293D Motor Driver/Servo Shield for Arduino",
    slug: "l293d-motor-driver-servo-shield",
    category: "Motor Drivers",
    shortDescription: "The L293D Motor Driver/Servo Shield for Arduino is compatible with Arduino boards",
    price: 201.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F02%2F1-4.jpg&w=1920&q=90",
    specifications: { partNumber: "L293D" }
  },

  // --- POWER ---
  {
    id: "DEN123",
    name: "Buck Converter",
    slug: "buck-converter",
    category: "Power",
    shortDescription: "Adjustable DC-DC step-down converter",
    price: 60.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F10%2F3-9.jpg&w=1920&q=90",
    specifications: { partNumber: "LM2596" }
  },

  // --- WIRELESS & CELLULAR ---
  {
    id: "DEN124",
    name: "Bluetooth Module",
    slug: "bluetooth-module",
    category: "Wireless",
    shortDescription: "Bluetooth serial communication module",
    price: 310.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2021%2F07%2F3-1.jpg&w=1920&q=90",
    specifications: { partNumber: "HC-05" }
  },
  {
    id: "DEN125",
    name: "SIM800L GSM Module Quad-Band GPRS Core Board",
    slug: "sim800l-gsm-module",
    category: "Cellular",
    shortDescription: "GSM/GPRS communication module",
    price: 550.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2F694.jpg&w=1920&q=90",
    specifications: { partNumber: "SIM800L" }
  },

  // --- RF ANTENNAS ---
  {
    id: "DEN126",
    name: "WiFi Antenna - 2.4 GHZ & 5 GHZ",
    slug: "wifi-antenna-2-4-ghz-5-ghz",
    category: "RF Antenna",
    shortDescription: "Wi-Fi 6 Dual Band Internal Antenna with Connectorized Cable",
    price: 280.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2021%2F05%2F307.jpg&w=1920&q=90",
    specifications: { partNumber: "TAEP121" }
  },
  {
    id: "DEN127",
    name: "25 mm x 25 mm x 4 mm SMD Antenna",
    slug: "smd-antenna-25x25x4",
    category: "RF Antenna",
    shortDescription: "Embedded SMD Antenna Covering GPS and GLONASS bands",
    price: 100.0,
    stock: 100,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbYBI1PA91xsQ8y0vO0TFnW5P6crKrvgCr4aJy2BvTqveSmJ9YRqGV3yoH&s=10",
    specifications: { partNumber: "CGMP165" }
  },
  {
    id: "DEN128",
    name: "18mm x 18mm x 4.0mm Ceramic Patch SMD Antenna",
    slug: "ceramic-patch-smd-antenna-18x18",
    category: "RF Antenna",
    shortDescription: "Embedded SMD Antenna Covering GPS and GLONASS bands",
    price: 110.0,
    stock: 100,
    image: "https://synzen.com.tw/uploads/antenna%20images/arietisd-new-1.png",
    specifications: { partNumber: "CGMP166" }
  },
  {
    id: "DEN129",
    name: "25mm x 25mm x 4.0mm Ceramic Patch Antenna through Hole",
    slug: "ceramic-patch-antenna-25x25x4",
    category: "RF Antenna",
    shortDescription: "GPS and GLONASS Ceramic Patch Antenna",
    price: 120.0,
    stock: 100,
    image: "https://cpimg.tistatic.com/06057794/b/4/Internal-Ceramic-GPS-Antenna-1575-42MHz.jpg",
    specifications: { partNumber: "CGMP167" }
  },
  {
    id: "DEN130",
    name: "25mm x 25mm x 8.0mm Single Feed Multiband Antenna",
    slug: "single-feed-multiband-antenna",
    category: "RF Antenna",
    shortDescription: "Single feed Multi-band Patch Antenna",
    price: 140.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fproduct%2F128023%2FbsCmZDRR6bxfFWb6vDxkvpbM8s3ENCtWFakEcA29.webp&w=1920&q=90",
    specifications: { partNumber: "CGMP168" }
  },

  // --- MEMORY ICs ---
  {
    id: "DEN131",
    name: "Puya NOR Flash Memory 16Mbit",
    slug: "puya-nor-flash-memory-16mbit",
    category: "Memory",
    shortDescription: "Puya 16Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil",
    price: 40.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F02%2F4978SOIC-3.98.jpg&w=1920&q=90",
    specifications: { partNumber: "PY25Q16HB-SUH-IR" }
  },
  {
    id: "DEN132",
    name: "Puya NOR Flash Memory 32Mbit",
    slug: "puya-nor-flash-memory-32mbit",
    category: "Memory",
    shortDescription: "Puya 32Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil",
    price: 50.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F03%2F2568WSON-80-6x5ZP8.jpg&w=1920&q=90",
    specifications: { partNumber: "PY25Q32HB-SUH-IR" }
  },
  {
    id: "DEN133",
    name: "Puya NOR Flash Memory 64Mbit",
    slug: "puya-nor-flash-memory-64mbit",
    category: "Memory",
    shortDescription: "Puya 64Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil",
    price: 80.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F02%2F8-SOIC_751.jpg&w=1920&q=90",
    specifications: { partNumber: "PY25Q64HA-SUH-IR" }
  },
  {
    id: "DEN134",
    name: "Puya NOR Flash Memory 128Mbit",
    slug: "puya-nor-flash-memory-128mbit",
    category: "Memory",
    shortDescription: "Puya 128Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil",
    price: 198.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F02%2F25616SOIC-75SF16-1.jpg&w=1920&q=90",
    specifications: { partNumber: "PY25Q128HA-SUH-IR" }
  },
  {
    id: "DEN135",
    name: "Puya EEPROM Memory 16Kb",
    slug: "puya-eeprom-memory-16kb",
    category: "Memory",
    shortDescription: "Puya 16Kb EEPROM Memory - 3.3V",
    price: 40.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F12%2FSOIC-24.jpg&w=1920&q=90",
    specifications: { partNumber: "P24C16C-SSH-MIR" }
  },
  {
    id: "DEN136",
    name: "Puya EEPROM Memory 32Kb",
    slug: "puya-eeprom-memory-32kb",
    category: "Memory",
    shortDescription: "Puya 32Kb EEPROM Memory - 3.3V",
    price: 38.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2022%2F01%2F4.jpg&w=1920&q=90",
    specifications: { partNumber: "P24C32C-SSH-MIR" }
  },
  {
    id: "DEN137",
    name: "Puya EEPROM Memory 64Kb",
    slug: "puya-eeprom-memory-64kb",
    category: "Memory",
    shortDescription: "Puya 64Kb EEPROM Memory - 3.3V",
    price: 42.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F10%2FR150959.jpg&w=1920&q=90",
    specifications: { partNumber: "P24C64C-SSH-MIR" }
  },
  {
    id: "DEN160",
    name: "1 GB NAND Flash Memory 1.8V / 3.3V",
    slug: "1-gb-nand-flash-memory",
    category: "Memory",
    shortDescription: "1Gbit 1.7V~1.95V 50MHz WSON-8-EP(6x8) NAND Flash Memory",
    price: 400.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F06%2F474523.jpg&w=1920&q=90",
    specifications: { partNumber: "GSS01GSAX1 (3.3V)" }
  },

  // --- ROBOTICS PROJECTS ---
  {
    id: "DEN144",
    name: "Obstacle Avoiding Robot Car Kit",
    slug: "obstacle-avoiding-robot-car-kit",
    category: "Robotics Project",
    shortDescription: "Arduino + Ultrasonic Technology",
    price: 4400.0,
    stock: 100,
    image: "https://m.media-amazon.com/images/I/41tWutkcVhL.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN145",
    name: "WiFi Controlled Bionic Robotic Hand",
    slug: "wifi-bionic-robotic-hand",
    category: "Robotics Project",
    shortDescription: "ESP32 + Servo Bionic Hand",
    price: 8800.0,
    stock: 100,
    image: "https://www.hiwonder.com/cdn/shop/files/1_1ed3473a-57c9-495c-9079-befeb620245d.jpg?v=1716284747%201200w",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN146",
    name: "Bluetooth Controlled Robot Car Kit",
    slug: "bluetooth-robot-car-kit",
    category: "Robotics Project",
    shortDescription: "Arduino + HC-05 Bluetooth Controlled Robot Car Kit",
    price: 2589.0,
    stock: 100,
    image: "https://roboticsdna.in/wp-content/uploads/2023/12/ZYC00982.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN147",
    name: "4/5 DOF Robotic Arm Kit",
    slug: "4-5-dof-robotic-arm",
    category: "Robotics Project",
    shortDescription: "ESP32 + Servo Multi-Axis Robotic Arm Kit",
    price: 4500.0,
    stock: 100,
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/6e582157-2334-4df5-8314-76b5e6693965.__CR67,0,1067,1200_PT0_SX200_V1___.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN148",
    name: "Automatic Smart Dustbin",
    slug: "automatic-smart-dustbin",
    category: "Robotics Project",
    shortDescription: "Arduino + Ultrasonic + Servo",
    price: 2600.0,
    stock: 100,
    image: "https://m.media-amazon.com/images/I/413dKTqXN4L._SX342_SY445_QL70_FMwebp_.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN149",
    name: "Automatic Fire Fighting Robot",
    slug: "automatic-fire-fighting-robot",
    category: "Robotics Project",
    shortDescription: "Arduino/ESP32 + Flame Sensor Autonomous Robot",
    price: 3900.0,
    stock: 100,
    image: "https://inrorwxhkjlolm5p.leadongcdn.com/cloud/mrBpqKmnRljSnoimoilnl/RXR-MC80BD.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN150",
    name: "Automatic Line Following Robot",
    slug: "automatic-line-following-robot",
    category: "Robotics Project",
    shortDescription: "Arduino + IR Sensors Line Follower",
    price: 2800.0,
    stock: 100,
    image: "https://cdn.bazargpt.com/images/very_high/digitek-solutions-line-follower-robotic-kit-4c3b5662.jpg",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN151",
    name: "WiFi Controlled ESP32 Robot Car",
    slug: "wifi-controlled-esp32-robot-car",
    category: "Robotics Project",
    shortDescription: "ESP32 + WiFi Robotics Car",
    price: 4399.0,
    stock: 100,
    image: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/8a28c2c5-9e1b-420e-b85d-27dc67aa4e96.__CR0,58,2400,1485_PT0_SX970_V1___.png",
    specifications: { partNumber: "N/A" }
  },

  // --- TOOLS & SOLDERING ---
  {
    id: "DEN152",
    name: "7Q7 3 in 1 Electric Soldering Iron - 25W",
    slug: "7q7-3-in-1-electric-soldering-iron-25w",
    category: "Tools & Soldering",
    shortDescription: "7Q7 3 in 1 Electric Soldering Iron - 25W / Solder - 50gm / Flux - 15gm kit",
    price: 250.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2021%2F12%2F27-2.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },

  // --- WIRING & BREADBOARDS ---
  {
    id: "DEN153",
    name: "Jumper Wires Set (M-M, M-F, F-F) 10cm - 30 Pcs",
    slug: "jumper-wires-10cm-30pcs",
    category: "Wiring & Breadboards",
    shortDescription: "10CM Male to Male, Male to Female, Female to Female Breadboard Jumper Dupont 2.54MM Cables (10+10+10)",
    price: 80.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F1-72.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN154",
    name: "Jumper Wires Set (M-M, M-F, F-F) 20cm - 30 Pcs",
    slug: "jumper-wires-20cm-30pcs",
    category: "Wiring & Breadboards",
    shortDescription: "20CM Male to Male, Male to Female, Female to Female breadboard jumper wires (10+10+10)",
    price: 110.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2025%2F09%2F1-72.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },
  {
    id: "DEN155",
    name: "Solderless 400 Pin Breadboard",
    slug: "solderless-400-pin-breadboard",
    category: "Wiring & Breadboards",
    shortDescription: "Experience hassle-free circuit prototyping with the Solderless 400 Pin Breadboard",
    price: 190.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2022%2F04%2FSolderless-400-pin-breadboard-Normal-Quality-Without-Packing-4.jpeg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  },

  // --- BATTERIES & POWER MANAGEMENT ---
  {
    id: "DEN161",
    name: "14.8V 26000mAh 4S1P 3C 18650 Li-ion Battery Pack with BMS",
    slug: "14-8v-26000mah-4s1p-18650-battery-pack-bms",
    category: "Batteries & Power Management",
    shortDescription: "This battery is protected with a BMS connection to ensure safety and overcharge protection",
    price: 575.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fproduct%2F2872946%2F0qRR8e5yvwDwfWOiU41LvySgmwX465myYjXzRd3y.webp&w=1920&q=90",
    specifications: { partNumber: "18650 4S1P" }
  },
  {
    id: "DEN162",
    name: "DMEGC INR18650-26E 3.7V 2600mAh Li-ion Battery",
    slug: "dmegc-inr18650-26e-li-ion-battery",
    category: "Batteries & Power Management",
    shortDescription: "High-performance 3.7V 2600mAh Li-ion rechargeable cell",
    price: 180.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2024%2F03%2Fcell.6.jpg&w=1920&q=90",
    specifications: { partNumber: "INR18650-26E" }
  },
  {
    id: "DEN163",
    name: "2 x 18650 Battery Holder with DC Power Plug",
    slug: "2-x-18650-battery-holder-dc-plug",
    category: "Batteries & Power Management",
    shortDescription: "2-slot 18650 black battery holder case with standard DC barrel power plug",
    price: 60.0,
    stock: 100,
    image: "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F03%2F2-X-18650-Black-Battery-Holder-with-DC-Power-Plug-1.jpg&w=1920&q=90",
    specifications: { partNumber: "N/A" }
  }
];