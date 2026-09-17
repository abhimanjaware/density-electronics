export const categories = [
  "3D Printing",
  "Batteries & Power Management",
  "Camera Modules",
  "Cellular",
  "Development Boards",
  "Display",
  "Electronic Components",
  "Mechanical Equipments",
  "Memory",
  "Module",
  "Motor Drivers",
  "Motors",
  "Power",
  "RF Antenna",
  "Relays",
  "Robotics Project Kits",
  "Sensor Modules",
  "Supplier Brand",
  "Tools & Soldering",
  "Wireless",
  "Wiring & Breadboards"
];

export const products = [
  {
    "id": "DEN2001",
    "name": "Arduino Uno R3 Development Board",
    "slug": "arduino-uno-r3-development-board",
    "category": "Development Boards",
    "shortDescription": "Classic Arduino board built on the ATmega328P microcontroller; widely used for beginner to intermediate electronics and IoT projects.",
    "detailedDescription": "The most widely used Arduino board, based on the ATmega328P 8-bit microcontroller running at 16MHz. Offers 14 digital I/O pins (6 PWM-capable), 6 analog inputs, USB programming via a standard USB-B cable, and a large ecosystem of shields and tutorials, making it the standard starting point for most hobby and prototyping projects.",
    "price": 435.0,
    "stock": 100,
    "image": "https://robocraze.com/cdn/shop/products/Arduino_UNO_Board_1000x.png?v=1743775360",
    "specifications": {
      "partNumber": "ATmega328P"
    }
  },
  {
    "id": "DEN2002",
    "name": "Arduino Uno SMD Development Board",
    "slug": "arduino-uno-smd-development-board",
    "category": "Development Boards",
    "shortDescription": "SMD variant of the Uno board offering the same core functionality in a more compact, cost-effective form.",
    "detailedDescription": "Functionally identical to the standard Uno R3 but uses a surface-mount (TQFP) ATmega328P instead of the DIP package, giving a lower unit cost. Same pinout, voltage (5V logic), and programming method, so existing Uno shields and code work without changes.",
    "price": 250.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8dh6VIsecvbMYtu3e6p4fUlKAp70WcG_UpHfCST95clIdMFN3aTl_eL0&s=10",
    "specifications": {
      "partNumber": "ATmega328P (SMD)"
    }
  },
  {
    "id": "DEN2003",
    "name": "Arduino Nano V3.0",
    "slug": "arduino-nano-v3-0",
    "category": "Development Boards",
    "shortDescription": "Compact breadboard-friendly board, popular for space-constrained embedded projects.",
    "detailedDescription": "A small, breadboard-friendly board using the same ATmega328P as the Uno, but with a Mini/Micro-USB connector and no barrel power jack. Same processing capability in a smaller footprint, commonly used where board size matters more than the ability to stack shields.",
    "price": 230.0,
    "stock": 100,
    "image": "https://www.flyrobo.in/image/cache/catalog/arduino-nano-v3.0-atmega328p-ch340-chip-i-type-c-soldered-1/arduino-nano-v3.0-atmega328p-ch340-chip-i-type-c-soldered-1-3-600x315w.jpeg",
    "specifications": {
      "partNumber": "ATmega328P"
    }
  },
  {
    "id": "DEN2004",
    "name": "Arduino Pro Micro 5V / 16MHz",
    "slug": "arduino-pro-micro-5v---16mhz",
    "category": "Development Boards",
    "shortDescription": "Small-footprint board with native USB support, suited for HID/keyboard-emulation and wearable projects.",
    "detailedDescription": "Built around the ATmega32U4, which has native USB support built into the chip itself (unlike the Uno's separate USB-serial chip). This lets it act directly as a USB keyboard/mouse/MIDI device, popular for custom keyboards, game controllers, and other HID projects.",
    "price": 400.0,
    "stock": 100,
    "image": "https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2018/08/13.jpg",
    "specifications": {
      "partNumber": "ATmega32U4"
    }
  },
  {
    "id": "DEN2005",
    "name": "Arduino Pro Mini ATMEGA328P 5V/16MHz",
    "slug": "arduino-pro-mini-atmega328p-5v-16mhz",
    "category": "Development Boards",
    "shortDescription": "Minimalist board without onboard USB, ideal for permanent, low-power project builds.",
    "detailedDescription": "A bare-bones ATmega328P board with no onboard USB-to-serial chip or USB connector, programmed via an external FTDI/USB-serial adapter. Its small size and low cost make it suited for permanent installations and battery-powered projects where every mm and mA counts.",
    "price": 250.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRYar9SS2ZlxREHeBmDafVGg_Zz94SQEgxdjCGGS7rrmmsvCxKNG2ysX2AGLWow44XFxRaKa5fMt8uwGzz7HIZk1A8oacj7MSd9keAOezls6AIxW0NleSRftxbqtmWS&usqp=Cac",
    "specifications": {
      "partNumber": "ATmega328P"
    }
  },
  {
    "id": "DEN2006",
    "name": "Arduino Mega 2560",
    "slug": "arduino-mega-2560",
    "category": "Development Boards",
    "shortDescription": "Higher pin-count board for projects needing more I/O, memory, and multiple serial interfaces.",
    "detailedDescription": "Based on the ATmega2560, offering 54 digital I/O pins (15 PWM), 16 analog inputs, 4 hardware serial ports, and far more flash/RAM than the Uno. Used for larger projects such as 3D printer controllers, multi-sensor rigs, or anything that outgrows the Uno's pin count.",
    "price": 1250.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSgaygV1MYUnmz9dr0agFyJiaDN76M8jiRKmoljoOfT70C3edySblj2R6V5oOfHq7gc-fQq6PuBqxqTgpI01h_HoEiFbxwvj2oWMKJMp20HSVEznzShItdFho2tjdd1kpeLOKMO1Q&usqp=Cac",
    "specifications": {
      "partNumber": "ATmega2560"
    }
  },
  {
    "id": "DEN2007",
    "name": "Wemos D1 ESP8266 WiFi Board",
    "slug": "wemos-d1-esp8266-wifi-board",
    "category": "Development Boards",
    "shortDescription": "Uno-form-factor WiFi development board built around the ESP8266, suited for IoT applications.",
    "detailedDescription": "An Uno-shaped board built around the ESP8266 WiFi SoC, so it accepts many Uno shields while adding built-in WiFi. Programmable via the Arduino IDE, commonly used for IoT projects that need internet connectivity without an extra WiFi module.",
    "price": 330.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS4oAnniBVRCei1g1D9zBWwGK-Lz7JIQnb1A5U0LZ4hfzBBGkMYvTXy7UDlZMZDq84jUVJSXXGuen8A1WFgKcWgyf5pQiv5Vqg8Fe_1_86tJIi_-Ax3iQL5adnZRVyxFJlLyI0UuQ&usqp=Cac",
    "specifications": {
      "partNumber": "ESP8266"
    }
  },
  {
    "id": "DEN2008",
    "name": "Arduino Uno Cable",
    "slug": "arduino-uno-cable",
    "category": "Wiring & Breadboards",
    "shortDescription": "Standard USB cable used for programming and powering Uno/Mega-format boards.",
    "detailedDescription": "A standard USB-A to USB-B cable used to connect Uno, Mega, and similar boards to a computer for programming, serial communication, and 5V power delivery.",
    "price": 25.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTwg-6i5ZKe6oQQpAwUjmFQcmKSIJq47obAtjWd8Qk8BRzmcmtUiSz10tSgGwO3D7jMDynm1sBFMGqkwmdxIDHJeodc6xokY8C0LyvcZpjc8dLpqlqXJL5L1syMesqo9G5XkB_UQZs&usqp=Cac",
    "specifications": {
      "partNumber": "USB-B Cable"
    }
  },
  {
    "id": "DEN2009",
    "name": "Arduino Nano Cable",
    "slug": "arduino-nano-cable",
    "category": "Wiring & Breadboards",
    "shortDescription": "USB cable for programming and powering Nano-format boards.",
    "detailedDescription": "A USB-A to Mini-USB (or Micro-USB, depending on Nano revision) cable used to program and power Nano-format boards from a computer.",
    "price": 25.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcR4aByJzW2ACKMIHnVMPPhtBhTqyNgDy1GrfjawIy2upcQ_0QcHEvdNFrUbaMDJ1lluZXqkf64b0pAf886MBNMLXqmZlnTJ50tP7wwKrWlGy35X8OMY3but4XTLNv9kDE2eIgx4rmJwhGY&usqp=Cac",
    "specifications": {
      "partNumber": "Mini/Micro USB Cable"
    }
  },
  {
    "id": "DEN2010",
    "name": "ESP32 Development Board",
    "slug": "esp32-development-board",
    "category": "Development Boards",
    "shortDescription": "Dual-core WiFi + Bluetooth development board, popular for more demanding IoT projects.",
    "detailedDescription": "Built around the dual-core ESP32-WROOM module with built-in WiFi and Bluetooth, plus significantly more processing power, RAM, and GPIO than 8-bit boards. Used for IoT projects that need wireless connectivity, more compute, or Bluetooth in addition to WiFi.",
    "price": 350.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTupo52Qk9pi6ahWEypFL0u278N4GIseMT1RNFWg9J3ADhdvH1Qr0ZBNBJ6O6HgvxbylNv38VWvG-wXyL28DkLIzZJkychvp8bqtm1kMRAy_2sdXDB-hxi_sMi64ZQPcK3NDaGyupU&usqp=Cac",
    "specifications": {
      "partNumber": "ESP32-WROOM"
    }
  },
  {
    "id": "DEN2011",
    "name": "ESP8266 NodeMCU CP2102 Board",
    "slug": "esp8266-nodemcu-cp2102-board",
    "category": "Development Boards",
    "shortDescription": "NodeMCU WiFi board with CP2102 USB-to-serial chip, commonly used for IoT prototyping.",
    "detailedDescription": "A NodeMCU-format board built on the ESP8266 with a CP2102 USB-to-serial chip for reliable USB programming. Widely used for WiFi-connected sensor nodes, home automation, and other IoT prototyping.",
    "price": 260.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRQrC_DGSVnGVxGZQIlLI8INpFuLRm2eSPYOSW-SRiVFMR-xZ9TFvCUQL6I7FWbsEvUfpoQGzNUqDWw_cuVWT8ulp7DjCtPBR9AzDZCFOiuqFHSapYFFQd0JqxvFhLmLZmIzFF4qLy5J0g&usqp=Cac",
    "specifications": {
      "partNumber": "ESP8266 / CP2102"
    }
  },
  {
    "id": "DEN2012",
    "name": "Neo6m GPS Module",
    "slug": "neo6m-gps-module",
    "category": "Module",
    "shortDescription": "GPS receiver module for location-tracking and navigation projects.",
    "detailedDescription": "Uses the u-blox NEO-6M GPS receiver chip to provide latitude/longitude, altitude, and time data over a UART serial connection. Commonly paired with Arduino/ESP boards for vehicle tracking, geofencing, and navigation projects.",
    "price": 280.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRCSVRg1udda8_fMPVAIe2s3dLg2Y3jJ03o6eTruno_kILiJ7SnsK148qig8oxtDufOkzi2Yg7KT3byoVSNx3KBtrwI2ylknD6a_0Xnee3FqxZ3-xGGPRxjqHDUQ2KQiyjjQQG9-pc&usqp=Cac",
    "specifications": {
      "partNumber": "u-blox NEO-6M"
    }
  },
  {
    "id": "DEN2013",
    "name": "16x2 Parallel LCD Display",
    "slug": "16x2-parallel-lcd-display",
    "category": "Display",
    "shortDescription": "16x2 character LCD for displaying text/sensor readouts in embedded projects.",
    "detailedDescription": "A 16-column, 2-row character LCD based on the industry-standard HD44780 controller, driven via a parallel data bus. Used to show sensor readings, menus, or status text directly from a microcontroller.",
    "price": 85.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRbGk2H4z7ExvDAcMxNqP-oqIet90Jnp4Sm-xEcUZxV_wG2DKoaEY2MHiebSeKxrCJmFXRgp-lJ-plmkJT1giLtz3FlnJwEvrLjpcoUjA1jncnWA7BkCeljCT8kJV9AtpvtO55kMPA&usqp=Cac",
    "specifications": {
      "partNumber": "HD44780"
    }
  },
  {
    "id": "DEN2014",
    "name": "I2C Serial Interface Adapter Module",
    "slug": "i2c-serial-interface-adapter-module",
    "category": "Electronic Components",
    "shortDescription": "I2C backpack module that lets a 16x2/20x4 LCD be driven with just 2 wires instead of a full parallel bus.",
    "detailedDescription": "A small PCF8574-based backpack that converts a parallel HD44780 LCD interface to I2C, cutting the wiring down from ~6 data lines to just SDA/SCL. Simplifies wiring and frees up GPIO pins on the microcontroller.",
    "price": 60.0,
    "stock": 100,
    "image": "https://rs.jlcpcb.com/static/image/blog/pcb/basic-electronic-components.webp",
    "specifications": {
      "partNumber": "PCF8574"
    }
  },
  {
    "id": "DEN2015",
    "name": "MAX30100 Pulse Oximeter Heart Rate Sensor Module",
    "slug": "max30100-pulse-oximeter-heart-rate-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Integrated pulse-oximetry and heart-rate sensor module for wearable/health monitoring projects.",
    "detailedDescription": "Built around the MAX30100 IC, which combines a pulse oximeter and heart-rate monitor using red and IR LEDs with photodetectors. Communicates over I2C, commonly used in wearable health-monitoring and fitness projects.",
    "price": 150.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ0e8wkH-LR5WOfiZQfC7oi65G2Wwn7VNiM99eudxVNGvN-rr3tgzGlzyO977tGSz327BAzpdrQ6Qc8VvXjaiyNKrwwSK1FRUZ6cJrQb0mmUyh8b7y6f1wkS6VvwE0rMi9Z7T1T4IOmd1s&usqp=Cac",
    "specifications": {
      "partNumber": "MAX30100"
    }
  },
  {
    "id": "DEN2016",
    "name": "HC-05 Bluetooth Module",
    "slug": "hc-05-bluetooth-module",
    "category": "Wireless",
    "shortDescription": "Classic Bluetooth 2.0 serial (SPP) module for wireless communication with microcontrollers.",
    "detailedDescription": "A Bluetooth 2.0 module implementing the Serial Port Profile (SPP), letting a microcontroller send/receive data wirelessly to a phone or PC over UART. Supports both master and slave modes, widely used for basic wireless control and telemetry projects.",
    "price": 240.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT2gREEImURaDYhZZeVkAsNSpXm0dkrC6deQ3F2J3vRcEqIJB--dI2ytxFWiP7Ol5XoCGUKRliS07dlx87dg0F6h868TllWlSjccYDZF45lnaVw24L2KwNxiaPeNNOJSVImChRClls&usqp=Cac",
    "specifications": {
      "partNumber": "HC-05"
    }
  },
  {
    "id": "DEN2017",
    "name": "4x4 Matrix Membrane Keypad",
    "slug": "4x4-matrix-membrane-keypad",
    "category": "Electronic Components",
    "shortDescription": "16-button membrane keypad for numeric/menu input in embedded projects.",
    "detailedDescription": "A flexible membrane keypad with 16 buttons arranged in a 4x4 matrix, connected via 8 pins. Read using row/column scanning, commonly used for PIN entry, menu navigation, and simple user input on Arduino-based projects.",
    "price": 60.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTRntzB7c1ktd4J0G0lm7hw38B8apzN0wRLU0jdMBA2SLNROXEX2PmiYgBC3HW4hBu9zN7EFH2Kv-qyQjLckPX8vXRCjPNMrdi1gTfk_nMnsw-Yu5oqaJH6&usqp=Cac",
    "specifications": {
      "partNumber": "Generic 4x4 Keypad"
    }
  },
  {
    "id": "DEN2018",
    "name": "4x3 Matrix Membrane Keypad",
    "slug": "4x3-matrix-membrane-keypad",
    "category": "Electronic Components",
    "shortDescription": "12-button membrane keypad (phone-style layout) for compact input needs.",
    "detailedDescription": "A 12-button membrane keypad in a phone-style 4x3 layout, connected via 7 pins and read through row/column scanning. A more compact alternative to the 4x4 keypad where fewer keys are needed.",
    "price": 60.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSUmSFkZP4ckqzfGRZitzw-aPNufBkJ7qyVpP_xvG94eNTCTN5r3jNYRsUyhhZ3tbSgYTH_xJualUNU2dEIZtMm01iAU0Ft_Hrv_n65DZnN8aR8TEVWmOCTpJHa5_opr3AYpE80M3PaxA&usqp=Cac",
    "specifications": {
      "partNumber": "Generic 4x3 Keypad"
    }
  },
  {
    "id": "DEN2019",
    "name": "Raindrop Detection Sensor Module",
    "slug": "raindrop-detection-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects rainfall/moisture on its sensing pad; used in weather and irrigation projects.",
    "detailedDescription": "Pairs a rain-sensing PCB pad with a comparator control board that gives both analog (rainfall intensity) and digital (rain/no-rain) outputs. Commonly used for automated window/awning closers, weather stations, and irrigation shutoff systems.",
    "price": 50.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR0jrhXlx5PGDRnivOPqlcCfqxTcTM7wgZiXAtcBoasKDkJYRPzPx0UdJKhonBke7EyFXZ5gxnU8ZHLZJQ0TNlsCM1ktEtPpNqfjtukmPCrjRrUcMIHzcwLyom0CX_JcB5DJI4hDg&usqp=Cac",
    "specifications": {
      "partNumber": "FC-37 / YL-83"
    }
  },
  {
    "id": "DEN2020",
    "name": "DHT11 Humidity and Temperature Sensor Module",
    "slug": "dht11-humidity-and-temperature-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Basic digital temperature and humidity sensor, one of the most common starter sensors.",
    "detailedDescription": "A low-cost digital sensor that reports temperature (0-50\u00b0C) and relative humidity (20-90%) over a single-wire digital interface. Lower precision than the DHT22/SHT sensors but very common for beginner weather/environment monitoring projects.",
    "price": 60.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTTZ11ItM_-xFOLFqDlTH_tCRezzSF9R_MRGbojKdPH2mpPgDvBNbWhpL7upJZlhj_N8qiYl9vjaroY_6_OaZEV0BaSEznCjK_uVIHG7xAu5B7TGTmIfsyxEOLEisGAf0HbYOX3dPY&usqp=Cac",
    "specifications": {
      "partNumber": "DHT11"
    }
  },
  {
    "id": "DEN2021",
    "name": "Soil Moisture Sensor Module",
    "slug": "soil-moisture-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Measures soil water content for automated plant-watering/irrigation projects.",
    "detailedDescription": "Uses two probes inserted into soil to measure resistance (and hence moisture content), paired with a comparator board giving analog and digital outputs. Commonly used in automated plant-watering systems and agriculture IoT projects.",
    "price": 70.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS8jgzlpmXcFtLjYfegyKClt-8qH90wU9rey2mZyxG7G33ltNfirQgbnk3Eook7Bp9ukN3F4chMbyJph09vFhSBUbQl98V3OHXkNfn0k1i5hUPKMtLUm0jLsydXoo-eLw&usqp=Cac",
    "specifications": {
      "partNumber": "FC-28 / YL-69"
    }
  },
  {
    "id": "DEN2022",
    "name": "Laser Module 5V 650NM",
    "slug": "laser-module-5v-650nm",
    "category": "Electronic Components",
    "shortDescription": "Small 5V red (650nm) laser diode module for pointer, trip-wire, and light-based projects.",
    "detailedDescription": "A compact 650nm red laser diode module that runs on 5V, typically switched on/off by a digital pin. Used in laser-tripwire alarms, laser-harp/light projects, and simple line-of-sight communication demos.",
    "price": 45.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQDQQi4AUfIyZFJ46KtBefUH2yPkQeGTDdYIE3cdI9Jrhn0XuuPCkLIxs7Eo7dpAGbiiw608Z7GWlO5HIBaKiwfnb9wt4gJUKgszJuDOzPMDZh0CcnlYjZCy48ViAMflxTLC78luQ&usqp=Cac",
    "specifications": {
      "partNumber": "650nm Laser Diode Module"
    }
  },
  {
    "id": "DEN2023",
    "name": "Flame Sensor Detection Module",
    "slug": "flame-sensor-detection-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects flame/fire via IR light within its sensing range; used for fire-alarm projects.",
    "detailedDescription": "Uses an IR-sensitive phototransistor tuned to the infrared wavelength emitted by flames, giving both analog and digital outputs. Commonly used in DIY fire-alarm and fire-fighting-robot projects, with a typical detection range up to ~1m depending on flame size.",
    "price": 55.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRdZSccZEF97ow_5UHfCD2ZiMjYmNm6AfehPzofzvN-HhyZfsVOlB4fqZuwg2SGK1ybNQC-P1ealn2Y7do8umZBeYf95Shhu7yawBs3tFsIc7upvsSls_HCyofsS9lCorLAjocMpA&usqp=Cac",
    "specifications": {
      "partNumber": "IR Flame Sensor"
    }
  },
  {
    "id": "DEN2024",
    "name": "Digital LDR Module",
    "slug": "digital-ldr-module",
    "category": "Sensor Modules",
    "shortDescription": "Light-dependent resistor module for detecting ambient light/darkness.",
    "detailedDescription": "Combines a light-dependent resistor (LDR) with a comparator board to give a digital HIGH/LOW output based on ambient light level (with an onboard potentiometer for threshold adjustment). Used for automatic night lights, light-triggered alarms, and simple light-sensing logic.",
    "price": 40.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSbRmQkhhNisMbPzlFV7HFlRO-0bPtONhoOSup62esvt8jO6_jlfr3epb0Bmd8n0N5WqrCyZz7qM2rvBmIhtF_2cjTx7VKrhLKOdPJmHHaFjI9yO6t-rWRE3iouXEL-OF3jCOFtnA&usqp=Cac",
    "specifications": {
      "partNumber": "LDR / Photoresistor Module"
    }
  },
  {
    "id": "DEN2025",
    "name": "Water Level Depth Detection Sensor Module",
    "slug": "water-level-depth-detection-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Measures relative water level via a series of exposed traces on a sensing strip.",
    "detailedDescription": "A PCB strip with parallel exposed copper traces that outputs a variable analog signal depending on how much of the strip is submerged. Used for tank-level monitoring, flood detection, and rain-gauge style projects.",
    "price": 35.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQCP1ecTPCdtcX-wK6hjuyxD-PbbChts-z8kB-uV0LJnbj629_k_acBbntFUr_pCQEC036m0FWHX6jABAXnyvDWcJY08E1gG644ohtVwiR3jlOg4H6G3JK1q3dNKoWxK1z6EOr9uRZM&usqp=Cac",
    "specifications": {
      "partNumber": "Generic Water Level Sensor"
    }
  },
  {
    "id": "DEN2026",
    "name": "RC522 RFID Reader Writer Module",
    "slug": "rc522-rfid-reader-writer-module",
    "category": "Electronic Components",
    "shortDescription": "13.56MHz RFID reader/writer kit for access-control and tagging projects.",
    "detailedDescription": "Built around the NXP MFRC522 IC, this module reads and writes 13.56MHz Mifare-type RFID cards/tags over SPI. Commonly used for access-control systems, attendance trackers, and inventory-tagging projects; usually bundled with a card and keyfob tag.",
    "price": 95.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdszY2zXa2peH4Qr-Tf3E8wGkH60gveCxotBQQv8BHcw&s=10",
    "specifications": {
      "partNumber": "MFRC522"
    }
  },
  {
    "id": "DEN2027",
    "name": "HC-SR04 Ultrasonic Sensor Module",
    "slug": "hc-sr04-ultrasonic-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Ultrasonic distance sensor, the standard choice for obstacle/distance detection.",
    "detailedDescription": "Measures distance (typically 2cm-400cm) by timing an ultrasonic pulse's echo return, controlled via Trigger and Echo digital pins. One of the most widely used sensors for obstacle-avoidance robots, parking sensors, and level-measurement projects.",
    "price": 85.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Tt5NTXQQwCVVEiZnStCKe-rrKpMK0ZGHRiNOpOluvQ&s=10",
    "specifications": {
      "partNumber": "HC-SR04"
    }
  },
  {
    "id": "DEN2028",
    "name": "IR Sensor Module",
    "slug": "ir-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "IR obstacle/proximity sensor with adjustable sensitivity, digital output.",
    "detailedDescription": "Uses an IR LED/photodiode pair to detect nearby objects, with an onboard potentiometer to adjust detection range and a digital output that goes LOW when an obstacle is detected. Commonly used in line-following and obstacle-avoidance robots.",
    "price": 35.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTnSbBR1IP3b7EjL6ISWuJsicNSP4c3nAMDn7M_CJHb7MUwcA-wS5ReQhu6YI3ngWiHLtSxYKfRBYChMQrXd5dRioljug--fETxe4rBT9dPAydYzxNv7tH6sQALMDNIRoWrrU_S-MA&usqp=Cac",
    "specifications": {
      "partNumber": "Generic IR Obstacle Sensor"
    }
  },
  {
    "id": "DEN2029",
    "name": "E18-D80NK Infrared Sensor",
    "slug": "e18-d80nk-infrared-sensor",
    "category": "Sensor Modules",
    "shortDescription": "Longer-range adjustable IR proximity sensor in a metal housing (up to ~80cm).",
    "detailedDescription": "An IR proximity sensor in a metal (waterproof-style) housing with an adjustable detection range of roughly 3-80cm via a rear potentiometer, giving a digital output. Used where longer range or a more rugged sensor housing than a basic IR module is needed.",
    "price": 210.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhND3EjdKJdOefXKMhBOtXY7xMb1S2Rk7_vFfPPAIeoA&s=10",
    "specifications": {
      "partNumber": "E18-D80NK"
    }
  },
  {
    "id": "DEN2030",
    "name": "Microphone Sensor Module",
    "slug": "microphone-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects ambient sound level/claps, with analog and digital outputs.",
    "detailedDescription": "An electret microphone paired with an amplifier/comparator board, giving an analog output proportional to sound level plus a digital output that triggers above a set threshold (adjustable via onboard potentiometer). Commonly used for clap-switches and sound-reactive projects.",
    "price": 45.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVm4Z1gz0L1AGVwTNAhjFpwckuFQL8-y01n3tKrRQCbA&s=10",
    "specifications": {
      "partNumber": "Generic Sound Sensor"
    }
  },
  {
    "id": "DEN2031",
    "name": "AMS1117 5V Power Supply Module",
    "slug": "ams1117-5v-power-supply-module",
    "category": "Power",
    "shortDescription": "Small fixed 5V linear regulator breakout for powering 5V boards/modules from a higher voltage.",
    "detailedDescription": "A breakout board for the AMS1117-5.0 linear voltage regulator, converting an input up to ~12V down to a fixed, regulated 5V output. Commonly used to power 5V logic (Arduino, sensors) from a higher-voltage battery or DC source.",
    "price": 40.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Q39TuHSeC50X-5UgRoLOipvHTwjiCpjvppFBVa_A-w&s=10",
    "specifications": {
      "partNumber": "AMS1117-5.0"
    }
  },
  {
    "id": "DEN2032",
    "name": "PIR Motion Sensor Detector Module",
    "slug": "pir-motion-sensor-detector-module",
    "category": "Sensor Modules",
    "shortDescription": "Passive infrared sensor for detecting human/animal motion.",
    "detailedDescription": "Detects motion by sensing changes in infrared radiation from moving bodies, with adjustable sensitivity and delay-time potentiometers. Standard sensor for automatic lighting, security alarms, and motion-triggered projects.",
    "price": 72.0,
    "stock": 100,
    "image": "https://ik.imagekit.io/t2r0vhpii/czshitc3toup8i54fepc.png",
    "specifications": {
      "partNumber": "HC-SR501 (typical)"
    }
  },
  {
    "id": "DEN2033",
    "name": "MQ135 Air Quality/Gas Detector Sensor",
    "slug": "mq135-air-quality-gas-detector-sensor",
    "category": "Sensor Modules",
    "shortDescription": "Detects air-quality gases (NH3, NOx, CO2, benzene, smoke) for air-quality monitoring projects.",
    "detailedDescription": "A metal-oxide gas sensor sensitive to a broad range of air-quality-related gases including ammonia, NOx, benzene, and smoke, giving an analog resistance-based output. Widely used in DIY air-quality monitors and pollution-detection projects.",
    "price": 132.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj5JJNRWp75uuiuopYJnypONqqw-IAsnZwsN3pnQAXCQ&s=10",
    "specifications": {
      "partNumber": "MQ-135"
    }
  },
  {
    "id": "DEN2034",
    "name": "MQ-2 Hydrogen Gas Sensor Detector Module",
    "slug": "mq-2-hydrogen-gas-sensor-detector-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects combustible/flammable gases including LPG, propane, hydrogen, and smoke.",
    "detailedDescription": "A metal-oxide sensor tuned for combustible gases such as LPG, propane, hydrogen, methane, and smoke, giving analog and threshold digital outputs. Commonly used in DIY gas-leak alarms and smoke-detector projects.",
    "price": 150.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSprRkeze9RlSBNVvtqtwLFm_1wj-lOrbeABIF5zdVd3RZheghx4s8YhsOFXZDe-yxU9LY4McVMIKsDFVKVMCZSMTfdiMuTi1w2zxize9_E_Rtwuhd-pGKVlCkO2Xh0959jlazGGPc&usqp=Cac",
    "specifications": {
      "partNumber": "MQ-2"
    }
  },
  {
    "id": "DEN2035",
    "name": "MQ-6 Isobutane Propane Gas Sensor Module",
    "slug": "mq-6-isobutane-propane-gas-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects LPG, isobutane, and propane gas concentrations.",
    "detailedDescription": "A metal-oxide sensor specifically tuned for LPG, isobutane, and propane detection, with both analog and digital (threshold) outputs. Used for LPG-leak detection and gas-safety alarm projects.",
    "price": 165.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpAV_iVtHKta6QvMfmmCVmIXEKA29-vmypa3TpX9_wA&s=10",
    "specifications": {
      "partNumber": "MQ-6"
    }
  },
  {
    "id": "DEN2036",
    "name": "BMP180 Digital Barometric Pressure Sensor Module",
    "slug": "bmp180-digital-barometric-pressure-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Measures barometric pressure and temperature; can derive altitude.",
    "detailedDescription": "An I2C digital sensor that measures barometric air pressure (300-1100 hPa) and temperature, from which relative altitude can be calculated. Used in weather-station and altitude-tracking projects (e.g. drones, weather balloons).",
    "price": 70.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSMbsNKSF0ZJLNuB7b6v97j5qbXvd018pS--nB3Dw2QMb4AuV06W2jOSwi1YdS3xkCDMXnDv_gLzllmV0UlDv4y9lRlt7OnNXYSeqWhKP8O4EtZHYxGEBzGo23_gQTJJwepZxsPsQ&usqp=Cac",
    "specifications": {
      "partNumber": "BMP180"
    }
  },
  {
    "id": "DEN2037",
    "name": "LM2596S DC-DC Buck Converter",
    "slug": "lm2596s-dc-dc-buck-converter",
    "category": "Power",
    "shortDescription": "Adjustable step-down (buck) power converter module for stepping a higher DC voltage down.",
    "detailedDescription": "An adjustable buck converter module built around the LM2596S, stepping down a higher input DC voltage (up to ~40V) to a user-set lower output via an onboard trimmer, at up to ~3A. Used to power 5V/12V electronics from higher-voltage battery packs.",
    "price": 50.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTj0NtD8tSIwSOMV_2JGVl2_57kWDfAG82F4MQGDYFEiPva47_oyar2Zm5AqfHrW3-ynfvohn9n91z6rujiajEkqvnGzm4v68ZS-58qSXoYpjUsPHYKk-Sb-2XLr1dt&usqp=Cac",
    "specifications": {
      "partNumber": "LM2596S"
    }
  },
  {
    "id": "DEN2038",
    "name": "XL6009 DC-DC Step-Up Converter",
    "slug": "xl6009-dc-dc-step-up-converter",
    "category": "Power",
    "shortDescription": "Adjustable step-up (boost) power converter module for boosting a lower DC voltage higher.",
    "detailedDescription": "An adjustable boost converter built around the XL6009 IC, stepping up a lower input DC voltage to a higher, user-set output via an onboard trimmer. Commonly used to run 12V/19V loads from a lower-voltage battery source.",
    "price": 72.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQnmV5qyJLYkNE3zmkHQ_2rnQTEY6WhRbXXvBh2nkgChfprwRpKrOJ17Q4s_4W6_--fL2y2_TzGzMvJ0VZuIyn1wVYBHVtgL20UVkJTYz22AqqIrg_HKhzvWjqYy9ctewX8_V7ySQ&usqp=Cac",
    "specifications": {
      "partNumber": "XL6009"
    }
  },
  {
    "id": "DEN2039",
    "name": "Joystick Module",
    "slug": "joystick-module",
    "category": "Electronic Components",
    "shortDescription": "Dual-axis analog joystick with push-button, for manual control/input.",
    "detailedDescription": "A PS2-style dual-potentiometer analog joystick giving separate X and Y analog outputs, plus a digital push-button (press-to-click) output. Commonly used for robot/RC control interfaces and menu navigation.",
    "price": 45.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRmpAYbq_-0pVUO_F7lyRFXCxQUku2Lo6l30Ee-Va4qTRtnxq-XPSi4RsipDcLPFlxr0CLHrkr-ZlBnWbF5wOjTUmAVlICpcAFNiaMZLRQ&usqp=Cac",
    "specifications": {
      "partNumber": "Dual-axis Analog Joystick (PS2-style)"
    }
  },
  {
    "id": "DEN2040",
    "name": "MPU6050 Gyroscope Sensor",
    "slug": "mpu6050-gyroscope-sensor",
    "category": "Sensor Modules",
    "shortDescription": "6-axis accelerometer + gyroscope module for motion/orientation sensing.",
    "detailedDescription": "Combines a 3-axis accelerometer and 3-axis gyroscope (plus an onboard Digital Motion Processor) in one I2C module, giving orientation, tilt, and motion data. Widely used in balancing robots, drones, and motion-tracking wearables.",
    "price": 180.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Ksx4UotHos3YYhN7YUWUUwPSsv0OJ8tlkK_flXQ-ow&s=10",
    "specifications": {
      "partNumber": "MPU6050"
    }
  },
  {
    "id": "DEN2041",
    "name": "555-DC Motor 12V High Torque",
    "slug": "555-dc-motor-12v-high-torque",
    "category": "Motors",
    "shortDescription": "12V high-torque DC gear motor for robotics and mechanical drive projects.",
    "detailedDescription": "A 12V-rated DC motor (555-frame size) offering higher torque than small hobby motors, commonly geared for robotics wheel drives, pumps, and other mechanical-load applications.",
    "price": 135.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQGjW3BTvnh3Hq94W-p6Cl_Ph5m1uEP_OsjJmp2Mm4J_Bz_8zpOAeBbCGqqV4HLOg9Ia73quJXMNBEqui6lrw4qDUhMYhcq15jexYa_S_0JCzrlHr0usoRkk1Fx-XYSGxvw2_0oMY2BOk8&usqp=Cac",
    "specifications": {
      "partNumber": "555 DC Gear Motor"
    }
  },
  {
    "id": "DEN2042",
    "name": "TowerPro MG995 Servo Motor 180° Rotation",
    "slug": "towerpro-mg995-servo-motor-180°-rotation",
    "category": "Motors",
    "shortDescription": "High-torque metal-gear servo with ~180° rotation, for robotic arms and RC projects.",
    "detailedDescription": "A metal-gear standard servo offering high torque (~10-13 kg-cm) and roughly 180° of rotation, controlled via standard PWM servo signal. Commonly used in robotic arms, RC vehicles, and pan-tilt mechanisms needing more torque than a micro servo.",
    "price": 220.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzcQVHbbmFr_S_umVhoZEgOexRidCA2wbnp8aRR6Fb9Q&s=10",
    "specifications": {
      "partNumber": "MG995"
    }
  },
  {
    "id": "DEN2043",
    "name": "TowerPro SG90 Mini Servo",
    "slug": "towerpro-sg90-mini-servo",
    "category": "Motors",
    "shortDescription": "Lightweight micro servo (~180°) for small-scale mechanisms and beginner robotics.",
    "detailedDescription": "A very common lightweight plastic-gear micro servo, offering roughly 180° of rotation via standard PWM control at low torque (~1.8 kg-cm). Popular for beginner robotics, small pan-tilt camera mounts, and RC hobby projects.",
    "price": 98.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRyKL74IkM5uDXga8cj58H_ZHVbio1PUxmKtbbTHJOeDkRn4ppJciQBxySXFrulzAt5hRVF5t4hLo0iBJlvKy77Na4nHB2V-1vo_4IV1FYhUx6SbB9M4thWnQoRy-rhiboRqb4C2g&usqp=Cac",
    "specifications": {
      "partNumber": "SG90"
    }
  },
  {
    "id": "DEN2044",
    "name": "DC Toy Motor 3V to 6V",
    "slug": "dc-toy-motor-3v-to-6v",
    "category": "Motors",
    "shortDescription": "Low-cost brushed DC motor for simple robotics/toy-level projects.",
    "detailedDescription": "A basic low-voltage (3-6V) brushed DC motor, ungeared, commonly used for simple robotics demos, fans, and toy-level mechanical projects where precise torque/speed control isn't critical.",
    "price": 20.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn3vuazfc0roSMYj36AKSVQj4OEfKFEu44KWiCXgkH5g&s=10",
    "specifications": {
      "partNumber": "Generic Brushed DC Motor"
    }
  },
  {
    "id": "DEN2045",
    "name": "L298N Motor Driver Module",
    "slug": "l298n-motor-driver-module",
    "category": "Motor Drivers",
    "shortDescription": "Dual H-bridge motor driver board for controlling two DC motors (or one stepper).",
    "detailedDescription": "A dual H-bridge driver board built around the L298N IC, letting a microcontroller control the direction and speed (via PWM) of two DC motors, or one 4-wire stepper motor. One of the most common motor-driver boards used with Arduino for robot wheel drives.",
    "price": 120.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQdssqxlqsveX52_Ryc0Rhs4ZrFdxi2oLIOVdAo4EBZ4jPKvAdLx5rSRqNzEIHJry7y9PyyXJfKAdJZmIwKZgAMroch4CG0ChFL5IAxL8Bcgwj3P_xZ2clKUyMWIZhted5hH17rqLs&usqp=Cac",
    "specifications": {
      "partNumber": "L298N"
    }
  },
  {
    "id": "DEN2046",
    "name": "L293D Motor Driver Shield",
    "slug": "l293d-motor-driver-shield",
    "category": "Motor Drivers",
    "shortDescription": "Arduino Uno-format shield for driving up to 4 DC motors or 2 steppers.",
    "detailedDescription": "A stackable shield (fits directly onto an Uno/Mega) built around the L293D driver IC, capable of controlling up to 4 DC motors or 2 stepper motors, or 2 servos. Commonly used for robot chassis builds where a separate driver board isn't wanted.",
    "price": 140.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRFOVAOXyvvukxULpqAEH2i-Q-L3iNd1INfTjH_rKdmtkwbUkzQFaLY4I9G7kcZceO7jIB8is3cx8QrqeKONBeIJtKJ20ZwY8pB7ZqUHU__S0b-Jc1s0NSGf9e4zGUKt0d8QcnDYcRY5Hg&usqp=Cac",
    "specifications": {
      "partNumber": "L293D"
    }
  },
  {
    "id": "DEN2047",
    "name": "BO Motor Plastic Gear Dual Shaft",
    "slug": "bo-motor-plastic-gear-dual-shaft",
    "category": "Motors",
    "shortDescription": "Low-cost plastic-gear DC motor with dual shaft, common in budget robot chassis kits.",
    "detailedDescription": "A low-cost geared DC motor with a plastic gearbox and dual output shaft (both ends usable), typically running on 3-12V. The standard motor bundled with budget 2WD/4WD robot chassis kits.",
    "price": 38.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9LKVoRogVO4YuVzdsQ51AHiMaSt4GXEal4-XMkNpspQ&s=10",
    "specifications": {
      "partNumber": "Generic BO Gear Motor"
    }
  },
  {
    "id": "DEN2048",
    "name": "Submersible DC Pump 3V-5V",
    "slug": "submersible-dc-pump-3v-5v",
    "category": "Motors",
    "shortDescription": "Small low-voltage submersible water pump for fountains, irrigation, and cooling projects.",
    "detailedDescription": "A small brushed DC submersible pump rated 3-5V, designed to run fully submerged in water for mini fountains, automated plant-watering rigs, or small liquid-cooling loops.",
    "price": 55.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRwUXDbbpZ7vG6g2nJ3wXJNUc1dDH7H_DE2op3KX95db-E9uOJ-K5MTLgEvyfYefhV_Yo_Tf3Sn2yg-T9_49WNzrA_90S9m-YEWe4sApeDnrXVe0rTT1EqygMnvzH79x4YheCvZeA8&usqp=Cac",
    "specifications": {
      "partNumber": "Generic Mini Submersible Pump"
    }
  },
  {
    "id": "DEN2049",
    "name": "1 Channel 5V Relay",
    "slug": "1-channel-5v-relay",
    "category": "Relays",
    "shortDescription": "Single-channel 5V relay module for switching mains/high-current loads from a microcontroller.",
    "detailedDescription": "A single relay (typically 10A rated) on a breakout board with opto-isolation, letting a 5V logic signal switch a mains-voltage or high-current DC load on/off. Used for controlling lights, pumps, and appliances from an Arduino/ESP board.",
    "price": 45.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDTb3Gcw_y5Glhcj2F7hU7PPZf8kJyK2IpBMaZ5TmB3H-5FzWNSEOT8iC6XmuBR4O32qTLb1AAyR9txtgAeP4HdVQ4VexJX7UPS6u4UEGcrZZPgaaTfGwCkC4pdTe-FhE_oUwuz2AF7Vs&usqp=Cac",
    "specifications": {
      "partNumber": "Generic 1-Ch Relay Module"
    }
  },
  {
    "id": "DEN2050",
    "name": "2 Channel 5V Relay",
    "slug": "2-channel-5v-relay",
    "category": "Relays",
    "shortDescription": "Two-channel 5V relay module for switching two independent loads.",
    "detailedDescription": "Same as the single-channel relay module but with two independent relay channels on one board, for controlling two separate mains/high-current loads from a microcontroller.",
    "price": 120.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQhDxfKn03UjU44tP8c0D5-zgqdMyg0PISR08IN6igveT7nbAWuBIdPb1ETmXc1T9oRP9MEnxqk1qWrhXbEYumMQW73i4Vtefh3s3WR0N9J9UJFjxlO_lgUAGCB38l2POdCxgfzgA&usqp=Cac",
    "specifications": {
      "partNumber": "Generic 2-Ch Relay Module"
    }
  },
  {
    "id": "DEN2051",
    "name": "4 Channel 5V Relay",
    "slug": "4-channel-5v-relay",
    "category": "Relays",
    "shortDescription": "Four-channel 5V relay module for switching up to four independent loads.",
    "detailedDescription": "A four-relay board with opto-isolated inputs, letting a microcontroller independently switch up to 4 mains/high-current loads. Common in home-automation and multi-appliance control projects.",
    "price": 150.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRtDWlP_p8qkz6ciKHy827Yzf5Tf6gnusn3bPcKPjxHvhPm2e5e28iDQWzMl2brJqe7xYK598jpdJaMcOK7HmxCY7RJCNdeKquUZD2HQxVAxkr1AF_prwx82w",
    "specifications": {
      "partNumber": "Generic 4-Ch Relay Module"
    }
  },
  {
    "id": "DEN2052",
    "name": "1 Channel 12V Relay Module",
    "slug": "1-channel-12v-relay-module",
    "category": "Relays",
    "shortDescription": "Single-channel relay module with a 12V coil, for 12V-powered control systems.",
    "detailedDescription": "Functionally similar to the 5V relay module but with a 12V coil, suited for projects already running on a 12V supply (e.g. car electronics, 12V automation systems).",
    "price": 65.0,
    "stock": 100,
    "image": "https://microohm-eg.com/wp-content/uploads/2024/02/46b7423a-b8ad-4dde-a8d0-4dba3d11a660.jpg",
    "specifications": {
      "partNumber": "Generic 1-Ch 12V Relay Module"
    }
  },
  {
    "id": "DEN2053",
    "name": "2 Channel 12V Relay",
    "slug": "2-channel-12v-relay",
    "category": "Relays",
    "shortDescription": "Two-channel 12V-coil relay module for switching two loads in 12V systems.",
    "detailedDescription": "A two-relay board with a 12V coil rating, for switching two independent loads in projects powered from a 12V supply.",
    "price": 120.0,
    "stock": 100,
    "image": "https://th.bing.com/th/id/OIP.lnx7iteKbyCfS063Jm8cuQHaHa?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    "specifications": {
      "partNumber": "Generic 2-Ch 12V Relay Module"
    }
  },
  {
    "id": "DEN2054",
    "name": "4 Channel 12V Relay",
    "slug": "4-channel-12v-relay",
    "category": "Relays",
    "shortDescription": "Four-channel 12V-coil relay module for switching up to four loads in 12V systems.",
    "detailedDescription": "A four-relay board with a 12V coil rating, letting a 12V-powered controller independently switch up to 4 separate loads.",
    "price": 180.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/6134V5Q5wsL.jpg",
    "specifications": {
      "partNumber": "Generic 4-Ch 12V Relay Module"
    }
  },
  {
    "id": "DEN2055",
    "name": "ULN2003 Stepper Motor Driver Module",
    "slug": "uln2003-stepper-motor-driver-module",
    "category": "Motor Drivers",
    "shortDescription": "Driver board for small unipolar stepper motors (commonly paired with the 28BYJ-48).",
    "detailedDescription": "A breakout board for the ULN2003 Darlington transistor array, used to drive small 5-wire unipolar stepper motors (most commonly the 28BYJ-48) from microcontroller logic-level signals.",
    "price": 68.0,
    "stock": 100,
    "image": "https://www.gosupps.com/media/catalog/product/cache/25/image/1500x/040ec09b1e35df139433887a97daa66f/7/1/71De-ToyT0L._SL1500_.jpg",
    "specifications": {
      "partNumber": "ULN2003"
    }
  },
  {
    "id": "DEN2056",
    "name": "4 X 18650 Cell Battery Holder",
    "slug": "4-x-18650-cell-battery-holder",
    "category": "Batteries & Power Management",
    "shortDescription": "Plastic holder for 4 18650 Li-ion cells, for building custom battery packs.",
    "detailedDescription": "A plastic battery holder with wired leads for 4 18650 cylindrical Li-ion cells, used to assemble custom battery packs (series/parallel wiring done separately) for robotics or portable power projects.",
    "price": 52.0,
    "stock": 100,
    "image": "https://componentstree.com/wp-content/uploads/2021/05/4-cell-18650-battery-holder-800x800-1.jpg",
    "specifications": {
      "partNumber": "4x18650 Holder"
    }
  },
  {
    "id": "DEN2057",
    "name": "1 X 18650 Cell Battery Holder",
    "slug": "1-x-18650-cell-battery-holder",
    "category": "Batteries & Power Management",
    "shortDescription": "Single-cell 18650 holder for simple single-cell power setups.",
    "detailedDescription": "A basic plastic holder with wired leads for a single 18650 Li-ion cell, used where only one cell's worth of power is needed.",
    "price": 25.0,
    "stock": 100,
    "image": "https://tse3.mm.bing.net/th/id/OIP.z_5SW7e-n2BOQ5PvBbJu4AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    "specifications": {
      "partNumber": "1x18650 Holder"
    }
  },
  {
    "id": "DEN2058",
    "name": "2 X 18650 Cell Battery Holder",
    "slug": "2-x-18650-cell-battery-holder",
    "category": "Batteries & Power Management",
    "shortDescription": "Two-cell 18650 holder for building small series/parallel battery packs.",
    "detailedDescription": "A plastic holder with wired leads for 2 18650 cells, used to build a small custom battery pack (wired series for ~7.4V, or parallel for higher capacity at 3.7V).",
    "price": 30.0,
    "stock": 100,
    "image": "https://probots.co.in/pub/media/catalog/product/cache/d8ddd0f9b0cd008b57085cd218b48832/2/_/2_x_18650_cell_lithium_ion_battery_holder_smt_smd_socket_3_.jpg",
    "specifications": {
      "partNumber": "2x18650 Holder"
    }
  },
  {
    "id": "DEN2059",
    "name": "3 X 18650 Cell Battery Holder",
    "slug": "3-x-18650-cell-battery-holder",
    "category": "Batteries & Power Management",
    "shortDescription": "Three-cell 18650 holder for mid-size custom battery packs.",
    "detailedDescription": "A plastic holder with wired leads for 3 18650 cells, used to build a mid-capacity custom battery pack for robotics or portable electronics.",
    "price": 32.0,
    "stock": 100,
    "image": "https://technicalhut.in/wp-content/uploads/2021/12/3-cell-holder-2-768x768.jpg",
    "specifications": {
      "partNumber": "3x18650 Holder"
    }
  },
  {
    "id": "DEN2060",
    "name": "18650 Li-Ion 3.7v 2000mAh Cell",
    "slug": "18650-li-ion-3-7v-2000mah-cell",
    "category": "Batteries & Power Management",
    "shortDescription": "Rechargeable 3.7V 18650 Li-ion cell, 2000mAh capacity, for battery packs and portable power.",
    "detailedDescription": "A single rechargeable 3.7V nominal, 2000mAh 18650 cylindrical Li-ion cell, the standard building block for custom battery packs in robotics, flashlights, and portable electronics (requires a matching Li-ion charger/BMS for safe charging).",
    "price": 50.0,
    "stock": 100,
    "image": "https://cdn.ecommercedns.uk/files/2/258392/3/40138273/inr18650-2000mah-li-ion-batteyr.jpg",
    "specifications": {
      "partNumber": "18650 2000mAh"
    }
  },

  {
    "id": "DEN2061",
    "name": "9V Original HW Battery",
    "slug": "9v-original-hw-battery",
    "category": "Batteries & Power Management",
    "shortDescription": "Standard 9V block battery for low-drain electronics.",
    "detailedDescription": "A standard 9V block-style battery, commonly used for powering low-drain Arduino/sensor projects, smoke detectors, or as a portable power source with a 9V snap connector.",
    "price": 26.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/office-supplies/stationary-items/battery-cell/OFF.BAT.126346236_1754029567690.webp",
    "specifications": {
      "partNumber": "9V Carbon-Zinc Battery"
    }
  },
  {
    "id": "DEN2062",
    "name": "9V Battery Snap Connector",
    "slug": "9v-battery-snap-connector",
    "category": "Batteries & Power Management",
    "shortDescription": "Snap-on connector with leads for wiring a 9V battery into a circuit.",
    "detailedDescription": "A simple snap-on clip with two wire leads, used to connect a 9V battery to a breadboard, barrel jack, or project circuit.",
    "price": 8.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSlSLI65DIAWHUe16Z3X6h1DruZObllAnZdjsSTW0FELU_2L95cifvbjh8g7mF5rU_7kYuE7mneo9KW_kvlOIFmXcDPPE4yDB1_FzHgTYqA-gorGkoP9hvT",
    "specifications": {
      "partNumber": "9V Battery Clip"
    }
  },
  {
    "id": "DEN2063",
    "name": "DC Voltage and Current Digital Meter 10A 0V-100V",
    "slug": "dc-voltage-and-current-digital-meter-10a-0v-100v",
    "category": "Electronic Components",
    "shortDescription": "Panel-mount digital meter showing DC voltage (0-100V) and current (up to 10A) simultaneously.",
    "detailedDescription": "A compact digital panel meter with dual displays showing DC voltage (0-100V) and current (0-10A) at the same time, wired via a shunt. Commonly embedded into power supplies, battery packs, and solar setups to monitor output.",
    "price": 265.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/testing-and-measuring-instruments/process-monitoring/voltmeter/TES.VOL.928914525_1738155152664.webp",
    "specifications": {
      "partNumber": "Generic DC Volt/Amp Meter"
    }
  },
  {
    "id": "DEN2064",
    "name": "1S to 8S Battery Level Indicator Module",
    "slug": "1s-to-8s-battery-level-indicator-module",
    "category": "Batteries & Power Management",
    "shortDescription": "LED battery-level display for 1S-8S Li-ion/LiPo packs.",
    "detailedDescription": "A small LED-based indicator module that displays the approximate charge level of a Li-ion/LiPo battery pack configured anywhere from 1S to 8S (series cell count is set via a jumper/switch), commonly used in RC and DIY battery-pack builds.",
    "price": 130.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/testing-and-measuring-instruments/automotive-testing/battery-tester/TES.BAT.133378043_1749009615908.webp",
    "specifications": {
      "partNumber": "Generic Li-ion Cell Indicator"
    }
  },
  {
    "id": "DEN2065",
    "name": "Rocker Switch DPDT 6Pin ON-OFF-ON",
    "slug": "rocker-switch-dpdt-6pin-on-off-on",
    "category": "Electronic Components",
    "shortDescription": "6-pin double-pole double-throw rocker switch with ON-OFF-ON positions.",
    "detailedDescription": "A panel-mount rocker switch with 6 pins (double-pole, double-throw) and three positions (ON-OFF-ON), commonly used for reversing motor direction or switching between two circuits plus an off state.",
    "price": 27.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/industrial-automation/switches-and-switch-boxes/basic-switch/IND.BAS.233430248_1749441493733.webp",
    "specifications": {
      "partNumber": "6-Pin DPDT Rocker Switch"
    }
  },
  {
    "id": "DEN2066",
    "name": "6-0-6 Stepdown Transformer 1A",
    "slug": "6-0-6-stepdown-transformer-1a",
    "category": "Power",
    "shortDescription": "Center-tapped 6-0-6V, 1A step-down transformer for mains-to-low-voltage power supplies.",
    "detailedDescription": "A center-tapped step-down transformer providing 6-0-6V AC output at up to 1A from mains input, typically used as the front end of a linear DC power supply (followed by a rectifier and regulator).",
    "price": 180.0,
    "stock": 100,
    "image": "https://robotools.in/wp-content/uploads/2022/10/IMG_2562.jpg",
    "specifications": {
      "partNumber": "6-0-6V 1A Transformer"
    }
  },
  {
    "id": "DEN2067",
    "name": "Micro USB Data Cable",
    "slug": "micro-usb-data-cable",
    "category": "Wiring & Breadboards",
    "shortDescription": "Standard Micro-USB data/charging cable for boards and devices with a Micro-USB port.",
    "detailedDescription": "A standard USB-A to Micro-USB cable used for programming/powering boards (e.g. NodeMCU, ESP32 dev boards) and charging devices with a Micro-USB port.",
    "price": 60.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/industrial-automation/connector/usb-cables/IND.USB.420937996_1692366998274.webp",
    "specifications": {
      "partNumber": "Micro-USB Cable"
    }
  },
  {
    "id": "DEN2068",
    "name": "20W Soldering Bit",
    "slug": "20w-soldering-bit",
    "category": "Tools & Soldering",
    "shortDescription": "Replacement bit/tip for a 20W soldering iron.",
    "detailedDescription": "A replacement tip for a standard 20W soldering iron, used once the original tip wears down or oxidizes from regular use.",
    "price": 80.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/soldering/soldering-iron/SO.SO1.1619998.jpg",
    "specifications": {
      "partNumber": "Generic 20W Iron Tip/Bit"
    }
  },
  {
    "id": "DEN2069",
    "name": "TP4056 Charging Module - Type C",
    "slug": "tp4056-charging-module---type-c",
    "category": "Batteries & Power Management",
    "shortDescription": "Single-cell Li-ion/LiPo charging module with USB Type-C input.",
    "detailedDescription": "A single-cell Li-ion/LiPo linear charger built around the TP4056 IC, with a USB-C input port and onboard charge-status LEDs. Used to safely charge a single 3.7V cell from a standard USB-C source.",
    "price": 16.0,
    "stock": 100,
    "image": "https://aerokartindia.in/wp-content/uploads/2026/06/download-29-768x768.avif",
    "specifications": {
      "partNumber": "TP4056 (USB-C)"
    }
  },
  {
    "id": "DEN2070",
    "name": "TP4056 Charging Module - Micro USB",
    "slug": "tp4056-charging-module---micro-usb",
    "category": "Batteries & Power Management",
    "shortDescription": "Single-cell Li-ion/LiPo charging module with Micro-USB input.",
    "detailedDescription": "The same TP4056-based single-cell Li-ion/LiPo charger, but with a Micro-USB input port instead of USB-C, for use with older USB cables/chargers.",
    "price": 18.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/industrial-automation/electrical-components-and-material/battery-and-its-accessories/IND.BAT.239761252_1773406208729.webp",
    "specifications": {
      "partNumber": "TP4056 (Micro-USB)"
    }
  },
  {
    "id": "DEN2071",
    "name": "USB TO TTL CP2102",
    "slug": "usb-to-ttl-cp2102",
    "category": "Electronic Components",
    "shortDescription": "USB-to-serial adapter for programming boards without onboard USB (e.g. Pro Mini) and general serial debugging.",
    "detailedDescription": "A USB-to-TTL serial adapter built around the CP2102 chip, used to program boards without native USB (like the Arduino Pro Mini) and for general serial-port debugging/communication with microcontrollers.",
    "price": 165.0,
    "stock": 100,
    "image": "https://easyelecmodule.com/product/cp2102-module-usb-to-ttl-micro-interface/",
    "specifications": {
      "partNumber": "CP2102 USB-UART Adapter"
    }
  },
  {
    "id": "DEN2072",
    "name": "Jet Black PLA+ 3D Printer Filament",
    "slug": "jet-black-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Jet black PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "A premium PLA+ filament in jet black, typically 1.75mm diameter, offering better toughness and layer adhesion than standard PLA for FDM 3D printers. Used for printing enclosures, brackets, and prototype parts.",
    "price": 750.0,
    "stock": 100,
    "image": "https://india.numakers.com/cdn/shop/files/Pitch_Black_Spool_Printzy.png?v=1743935390",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2073",
    "name": "Pure White PLA+ 3D Printer Filament",
    "slug": "pure-white-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Pure white PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "The same premium PLA+ filament line in pure white, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/industrial-automation/printing-machinery/3d-printers-accessories/IND.3DP.327480691_1727079983013.webp",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2074",
    "name": "Red PLA+ 3D Printer Filament",
    "slug": "red-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Red PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "The same premium PLA+ filament line in red, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://www.ipro3d.io/product/fila3d-pla-filament-1-75mm-red-color-1kg/",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2075",
    "name": "Amber Yellow PLA+ 3D Printer Filament",
    "slug": "amber-yellow-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Amber yellow PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "The same premium PLA+ filament line in amber yellow, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/electronics-robotics/robot-accessories/parts-accessories/ELE.PAR.55158498_1668160818609.webp",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2076",
    "name": "Forest Green PLA+ 3D Printer Filament",
    "slug": "forest-green-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Forest green PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "Same premium PLA+ filament line in forest green, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWsvYwM6w8GWCcCq-VjgcNQruwxOdYSuWUow5HdFWlis4UIMge2r1jFxHR&s=10",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2077",
    "name": "Silver Grey PLA+ 3D Printer Filament",
    "slug": "silver-grey-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Silver grey PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "Same premium PLA+ filament line in silver grey, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIeTpFGGYeNHEwEVLT_ueXZFvreBxDJ0lSuy1ru7B1_e2De9iRCB2ozsOw&s=10",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2078",
    "name": "Cyan PLA+ 3D Printer Filament",
    "slug": "cyan-pla+-3d-printer-filament",
    "category": "3D Printing",
    "shortDescription": "Cyan PLA+ filament (1.75mm) for FDM 3D printing.",
    "detailedDescription": "Same premium PLA+ filament line in cyan, 1.75mm diameter, for FDM 3D printers.",
    "price": 750.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/61uqd-RzKLL._AC_UF1000,1000_QL80_.jpg",
    "specifications": {
      "partNumber": "PLA+ 1.75mm"
    }
  },
  {
    "id": "DEN2079",
    "name": "USB TO UART TTL FT232RL Adapter Module",
    "slug": "usb-to-uart-ttl-ft232rl-adapter-module",
    "category": "Module",
    "shortDescription": "USB-to-serial adapter built on the FTDI FT232RL chip, an alternative to CP2102-based adapters.",
    "detailedDescription": "A USB-to-TTL serial converter built around the FTDI FT232RL chip, used to program boards lacking native USB and for general serial debugging - a widely-supported alternative to CP2102-based adapters.",
    "price": 130.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqIEoz9sDU9pNpe5UX4hlpL8Oiy5ULm251Rd2m8Ho9Wg&s=10",
    "specifications": {
      "partNumber": "FT232RL"
    }
  },
  {
    "id": "DEN2080",
    "name": "PWM 3A DC Motor Speed Regulator",
    "slug": "pwm-3a-dc-motor-speed-regulator",
    "category": "Motors",
    "shortDescription": "PWM-based speed controller for a single DC motor, up to 3A.",
    "detailedDescription": "A standalone PWM speed-control module (with onboard potentiometer) for a single DC motor rated up to 3A, used where simple manual speed adjustment is needed without a microcontroller.",
    "price": 140.0,
    "stock": 100,
    "image": "https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2020/02/1203B-PWM-6V-12V-24V-28V-3A-DC-Motor-Speed-Regulator-5.jpg",
    "specifications": {
      "partNumber": "Generic PWM DC Motor Controller"
    }
  },
  {
    "id": "DEN2081",
    "name": "Gear Motor L Clamp",
    "slug": "gear-motor-l-clamp",
    "category": "Mechanical Equipments",
    "shortDescription": "L-shaped mounting clamp/bracket for BO-type gear motors.",
    "detailedDescription": "A metal or plastic L-shaped bracket used to mount a BO-type gear motor onto a robot chassis or project frame.",
    "price": 20.0,
    "stock": 100,
    "image": "https://www.theengineerstore.in/products/l-clamp-for-mounting-geared-motor?srsltid=AU7gw4ULE7EwPimfaWOhexXDmnUAXFTqrtN4pSpNOoW1WoGYu36b85zh",
    "specifications": {
      "partNumber": "Generic BO Motor Mounting Clamp"
    }
  },
  {
    "id": "DEN2082",
    "name": "ESP-01 ESP8266 Serial WIFI Wireless Transceiver Module",
    "slug": "esp-01-esp8266-serial-wifi-wireless-transceiver-module",
    "category": "Development Boards",
    "shortDescription": "Minimal, low-cost ESP8266 WiFi module controlled over serial (AT commands).",
    "detailedDescription": "The smallest and cheapest ESP8266-based module, offering WiFi connectivity over a serial UART interface (via AT commands) with just 8 pins. Commonly used to add WiFi to an existing Arduino project without replacing the main board.",
    "price": 110.0,
    "stock": 100,
    "image": "https://www.electropi.in/image/cache/catalog/esp8266-esp01-wifi-module-india-800x800.jpg",
    "specifications": {
      "partNumber": "ESP8266 (ESP-01)"
    }
  },
  {
    "id": "DEN2083",
    "name": "433MHz RF Transmitter Receiver Wireless Module",
    "slug": "433mhz-rf-transmitter-receiver-wireless-module",
    "category": "Wireless",
    "shortDescription": "Low-cost 433MHz RF transmitter/receiver pair for simple wireless remote-control links.",
    "detailedDescription": "A pair of simple 433MHz ASK/OOK transmitter and receiver modules used to send digital data wirelessly over moderate range, commonly used for remote-controlled switches, simple sensor links, and wireless doorbells.",
    "price": 143.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1GYeqKlHThGg8M6MHqt95g43rt1jtBp8goThuu2cw9WCfLfXZPDFgIg&s=10",
    "specifications": {
      "partNumber": "Generic 433MHz TX/RX Pair"
    }
  },
  {
    "id": "DEN2084",
    "name": "360 Degree Rotary Encoder Sensor Module",
    "slug": "360-degree-rotary-encoder-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Rotary encoder with push-button for menu navigation and precise rotational input.",
    "detailedDescription": "A rotary encoder module (often KY-040 style) giving quadrature output for detecting rotation direction/steps, plus an integrated push-button switch. Commonly used for volume controls, menu navigation, and precise manual input in embedded projects.",
    "price": 83.0,
    "stock": 100,
    "image": "https://sharvielectronics.com/product/360-degree-rotary-encoder-module/?srsltid=AU7gw4UgKz2boYeXt8SgLucFTxwwBnyVWs1lnZaz1AGWW6n5cYs_nWZ4",
    "specifications": {
      "partNumber": "Generic Rotary Encoder"
    }
  },
  {
    "id": "DEN2085",
    "name": "Micro SD Card Reader Module",
    "slug": "micro-sd-card-reader-module",
    "category": "Memory",
    "shortDescription": "SPI breakout for reading/writing MicroSD cards from a microcontroller.",
    "detailedDescription": "An SPI-interface breakout board that lets a microcontroller read/write files on a MicroSD card, commonly used for data logging, storing sensor readings, or loading configuration/media files in embedded projects.",
    "price": 60.0,
    "stock": 100,
    "image": "https://robu.in/product/micro-sd-card-module/",
    "specifications": {
      "partNumber": "Generic SPI SD Card Module"
    }
  },
  {
    "id": "DEN2086",
    "name": "Vibration Sensor Module SW-420",
    "slug": "vibration-sensor-module-sw-420",
    "category": "Sensor Modules",
    "shortDescription": "Vibration/shock detector with adjustable sensitivity, digital output.",
    "detailedDescription": "A normally-closed vibration switch (SW-420) paired with a comparator board giving a digital output that triggers on vibration/shock, with an onboard potentiometer for sensitivity adjustment. Used in tamper/shock-alarm and vibration-triggered projects.",
    "price": 68.0,
    "stock": 100,
    "image": "https://adiy.in/wp-content/uploads/2022/07/SW420-Tilt-Sensor-Module.jpg",
    "specifications": {
      "partNumber": "SW-420"
    }
  },
  {
    "id": "DEN2087",
    "name": "Stepper Motor 28BYJ-48 5V",
    "slug": "stepper-motor-28byj-48-5v",
    "category": "Motors",
    "shortDescription": "Small 5V unipolar stepper motor, the standard beginner stepper (usually paired with a ULN2003 driver).",
    "detailedDescription": "A small, geared 5V unipolar stepper motor with 5-wire connection, offering precise low-speed rotation. The most common beginner stepper motor, typically driven via a ULN2003-based driver board.",
    "price": 100.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/61Ml9ebd2kL.jpg",
    "specifications": {
      "partNumber": "28BYJ-48"
    }
  },
  {
    "id": "DEN2088",
    "name": "DS18B20 Waterproof Temperature Probe",
    "slug": "ds18b20-waterproof-temperature-probe",
    "category": "Sensor Modules",
    "shortDescription": "Waterproof digital temperature sensor probe on a cable, using the 1-Wire protocol.",
    "detailedDescription": "A waterproof stainless-steel probe housing the DS18B20 digital temperature sensor, communicating over the 1-Wire protocol and allowing multiple sensors to share a single data line. Commonly used for aquarium, liquid-cooling, and outdoor temperature monitoring.",
    "price": 92.0,
    "stock": 100,
    "image": "https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2017/09/sensor-de-temperatura-ds18b20-prova-d-agua.jpg",
    "specifications": {
      "partNumber": "DS18B20"
    }
  },
  {
    "id": "DEN2089",
    "name": "0.96\" OLED Display Module",
    "slug": "0-96-oled-display-module",
    "category": "Display",
    "shortDescription": "Small 128x64 monochrome OLED display, typically I2C, for compact project displays.",
    "detailedDescription": "A 0.96-inch, 128x64-pixel monochrome OLED display built around the SSD1306 driver, usually connected via I2C (2 wires). Popular for compact project displays showing sensor readings, menus, or status graphics with low power draw.",
    "price": 200.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/products/OLEDDisplay0.96InchI2CInterface4PinBlueSSD1306.jpg?v=1698321495",
    "specifications": {
      "partNumber": "SSD1306 0.96\" OLED"
    }
  },
  {
    "id": "DEN2090",
    "name": "ADXL335 3-Axis Accelerometer",
    "slug": "adxl335-3-axis-accelerometer",
    "category": "Sensor Modules",
    "shortDescription": "Analog 3-axis accelerometer module for tilt, orientation, and motion sensing.",
    "detailedDescription": "An analog output 3-axis accelerometer built around the ADXL335 IC, giving separate voltage outputs proportional to acceleration on the X, Y, and Z axes. Used for tilt-sensing, basic orientation detection, and simple motion/impact sensing projects.",
    "price": 465.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/51VR3S13zUL.jpg",
    "specifications": {
      "partNumber": "ADXL335"
    }
  },
  {
    "id": "DEN2091",
    "name": "Solenoid Door Lock 12V DC",
    "slug": "solenoid-door-lock-12v-dc",
    "category": "Mechanical Equipments",
    "shortDescription": "12V electric solenoid lock for electronic door-lock/access-control projects.",
    "detailedDescription": "A 12V DC solenoid lock that mechanically locks/unlocks when energized, commonly triggered via a relay from a microcontroller. Used in DIY access-control systems, cabinet locks, and automated door-lock projects.",
    "price": 349.0,
    "stock": 100,
    "image": "https://www.tanotis.com/cdn/shop/products/e279a860cd165566e7bd40619081e2da_600x.jpg?v=1576019025",
    "specifications": {
      "partNumber": "Generic 12V Solenoid Lock"
    }
  },
  {
    "id": "DEN2092",
    "name": "8 Ohm Speaker",
    "slug": "8-ohm-speaker",
    "category": "Electronic Components",
    "shortDescription": "Small 8-ohm speaker for basic audio/tone output in embedded projects.",
    "detailedDescription": "A small 8-ohm speaker, typically driven through an amplifier module or directly from a buzzer/tone-output circuit, used for alerts, simple tones, and basic audio playback in embedded projects.",
    "price": 45.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvPjHLjliN5rOZAzx60Dw87paT-dpQE3DEXFrqDyWvjNEcWGefI5gGSYyN&s=10",
    "specifications": {
      "partNumber": "Generic 8Ω Speaker"
    }
  },
  {
    "id": "DEN2093",
    "name": "2.4GHz NRF24L01+PA+LNA SMA Wireless Transceiver Antenna",
    "slug": "2-4ghz-nrf24l01+pa+lna-sma-wireless-transceiver-antenna",
    "category": "RF Antenna",
    "shortDescription": "Long-range 2.4GHz wireless transceiver module with external SMA antenna and power amplifier.",
    "detailedDescription": "A long-range variant of the NRF24L01 2.4GHz transceiver, adding a power amplifier (PA), low-noise amplifier (LNA), and external SMA antenna connector for extended range compared to the standard onboard-antenna version. Used for longer-distance wireless sensor links and remote-control projects.",
    "price": 170.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeR-1MGe1LD9jvilvnHN-ZCXmiMnsm2ZXmhfohhX5WkkHWFLy0cQCgiZ9S&s=10",
    "specifications": {
      "partNumber": "NRF24L01+PA+LNA"
    }
  },
  {
    "id": "DEN2094",
    "name": "SIM800L GPRS GSM Module",
    "slug": "sim800l-gprs-gsm-module",
    "category": "Cellular",
    "shortDescription": "GSM/GPRS module for SMS, calls, and mobile-network data using a SIM card.",
    "detailedDescription": "A compact GSM/GPRS module built around the SIM800L chipset, letting a microcontroller send/receive SMS, make calls, and connect to GPRS data over a 2G SIM card. Used for remote-alert systems, GPS trackers, and IoT projects in areas without WiFi.",
    "price": 290.0,
    "stock": 100,
    "image": "https://www.flyrobo.in/image/cache/catalog/sim800l-gprs-gsm-module-micro-sim-card-quad-band-ttl-serial-port/sim800l-gprs-gsm-module-micro-sim-card-quad-band-ttl-serial-port1-550x550.jpg",
    "specifications": {
      "partNumber": "SIM800L"
    }
  },
  {
    "id": "DEN2095",
    "name": "Voltage Detection Sensor Module 25V",
    "slug": "voltage-detection-sensor-module-25v",
    "category": "Sensor Modules",
    "shortDescription": "Resistor-divider based module for measuring DC voltage up to 25V via a microcontroller's analog input.",
    "detailedDescription": "A simple resistor-divider breakout that scales a DC input (up to 25V) down to a safe analog-read range for a microcontroller, used to monitor battery or supply voltage in a project.",
    "price": 20.0,
    "stock": 100,
    "image": "https://www.flyrobo.in/image/cache/catalog/voltage-detection-sensor-module-25v/voltage-detection-sensor-module-25v11-1024x1024.jpg",
    "specifications": {
      "partNumber": "Generic Voltage Divider Sensor"
    }
  },
  {
    "id": "DEN2096",
    "name": "ACS712 30A Range Current Sensor Module",
    "slug": "acs712-30a-range-current-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Hall-effect current sensor for measuring AC/DC current up to 30A.",
    "detailedDescription": "A Hall-effect based current sensor module (ACS712, 30A variant) that gives an analog voltage output proportional to current flowing through it, used for power monitoring, overcurrent protection, and energy-metering projects.",
    "price": 80.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/41C5CGncJdS.jpg",
    "specifications": {
      "partNumber": "ACS712-30A"
    }
  },
  {
    "id": "DEN2097",
    "name": "Capacitive Soil Moisture Sensor",
    "slug": "capacitive-soil-moisture-sensor",
    "category": "Sensor Modules",
    "shortDescription": "Corrosion-resistant capacitive soil moisture sensor, an upgrade over resistive soil sensors.",
    "detailedDescription": "A capacitive-sensing soil moisture probe that avoids the corrosion issues of resistive (two-probe) soil sensors, giving a more stable analog reading over time. Preferred for longer-term automated irrigation and plant-monitoring projects.",
    "price": 100.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnE2PDJaZ1noG4qWZLMkKCmLuLX1tn9vW_GtGEqzgDhquGX_HaGzLDIbE&s=10",
    "specifications": {
      "partNumber": "Generic Capacitive Soil Sensor v1.2"
    }
  },
  {
    "id": "DEN2098",
    "name": "Heart Rate Pulse Sensor Module",
    "slug": "heart-rate-pulse-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Optical pulse sensor (fingertip/earlobe) for basic heart-rate monitoring.",
    "detailedDescription": "An optical pulse sensor that clips onto a fingertip or earlobe, using reflected light to detect blood-volume changes and giving an analog signal proportional to heartbeat. Used in DIY heart-rate monitoring and biofeedback projects.",
    "price": 150.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/51ujIgCsgsL._AC_UF1000,1000_QL80_.jpg",
    "specifications": {
      "partNumber": "Generic Pulse Sensor"
    }
  },
  {
    "id": "DEN2099",
    "name": "A3144 Hall Effect Sensor Module",
    "slug": "a3144-hall-effect-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Digital Hall-effect sensor for detecting nearby magnets - used in speed sensing, door sensors, etc.",
    "detailedDescription": "A digital Hall-effect sensor (A3144) that outputs a signal when a magnet passes nearby, commonly used for RPM/speed sensing on wheels or motors, and for magnetic door/lid-open detection.",
    "price": 65.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv8_0HAMkXf5Jv6khmzq-HDrfLgq9GntmmTAIwGrcguyQVr4RFeoGV30U&s=10",
    "specifications": {
      "partNumber": "A3144"
    }
  },
  {
    "id": "DEN2100",
    "name": "DS1307 RTC I2C Module",
    "slug": "ds1307-rtc-i2c-module",
    "category": "Module",
    "shortDescription": "Real-time clock module with battery backup, keeps time even when the main board is powered off.",
    "detailedDescription": "An I2C real-time clock module built around the DS1307 chip, with a coin-cell battery backup so it keeps accurate time even when the main board is unpowered. Used in data loggers, clocks, and any project needing accurate timestamps.",
    "price": 80.0,
    "stock": 100,
    "image": "https://robu-prod-media.s3.ap-south-1.amazonaws.com/uploads/2019/03/Tiny-RTC-Real-Time-Clock-DS1307-I2C-IIC-Module-for-Arduino-ROBU.IN_.jpg",
    "specifications": {
      "partNumber": "DS1307"
    }
  },
  {
    "id": "DEN2101",
    "name": "ESP32 CAM WiFi Module Camera Module",
    "slug": "esp32-cam-wifi-module-camera-module",
    "category": "Development Boards",
    "shortDescription": "ESP32-based board with an integrated camera, WiFi, and MicroSD slot for image-capture IoT projects.",
    "detailedDescription": "Combines an ESP32 module with an OV2640 camera and a MicroSD card slot on one small board, letting it capture and stream/store images over WiFi. Popular for DIY security cameras, doorbell cameras, and simple computer-vision projects.",
    "price": 610.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/products/ESP32CameraDevelopmentBoardWiFi_BluetoothModulewithOV2640CameraModule.jpg?v=1630412315",
    "specifications": {
      "partNumber": "ESP32-CAM"
    }
  },
  {
    "id": "DEN2102",
    "name": "L293D Motor Driver (IC)",
    "slug": "l293d-motor-driver-ic",
    "category": "Motor Drivers",
    "shortDescription": "Standalone L293D dual H-bridge IC (DIP package) for driving two small DC motors.",
    "detailedDescription": "The bare L293D dual H-bridge driver chip in a DIP package (rather than a pre-built module), used to build a custom motor-driver circuit on a breadboard/PCB for controlling two small DC motors.",
    "price": 56.0,
    "stock": 100,
    "image": "https://roboticsdna.in/wp-content/uploads/2019/06/1B.jpg",
    "specifications": {
      "partNumber": "L293D"
    }
  },
  {
    "id": "DEN2103",
    "name": "HX711 Weighing Pressure Sensor Module",
    "slug": "hx711-weighing-pressure-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "24-bit ADC amplifier for load-cell based weight-sensing projects.",
    "detailedDescription": "A precision 24-bit ADC and amplifier module designed to read load-cell (strain-gauge) sensors, converting their tiny voltage changes into an accurate digital weight reading. Standard pairing for DIY digital weighing-scale projects.",
    "price": 70.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/41IRHotghJL._SX342_SY445_QL70_FMwebp_.jpg",
    "specifications": {
      "partNumber": "HX711"
    }
  },
  {
    "id": "DEN2104",
    "name": "RFID 13.56MHz Card",
    "slug": "rfid-13-56mhz-card",
    "category": "Electronic Components",
    "shortDescription": "13.56MHz passive RFID card compatible with RC522-type readers.",
    "detailedDescription": "A standard 13.56MHz Mifare-compatible RFID card, used together with an RC522-type reader for access control, attendance systems, and RFID-tagging projects.",
    "price": 20.0,
    "stock": 100,
    "image": "https://www.electropi.in/image/cache/catalog/rfid-card-13.56mhz-400x400.jpg",
    "specifications": {
      "partNumber": "Mifare 1K Card"
    }
  },
  {
    "id": "DEN2105",
    "name": "Dual Charger For 18650 Rechargeable Li-Ion Battery",
    "slug": "dual-charger-for-18650-rechargeable-li-ion-battery",
    "category": "Batteries & Power Management",
    "shortDescription": "Wall-plug charger that charges two 18650 Li-ion cells independently.",
    "detailedDescription": "A mains-powered charger with two independent charging bays for 18650 Li-ion cells, with charge-status LEDs per bay, used to safely recharge loose 18650 cells outside of a device.",
    "price": 250.0,
    "stock": 100,
    "image": "https://robocraze.com/cdn/shop/files/1_d6ec1a4e-c2de-407c-b874-d001c5b498e1_1000x.png?v=1752208910",
    "specifications": {
      "partNumber": "Generic Dual-Bay 18650 Charger"
    }
  },
  {
    "id": "DEN2106",
    "name": "5kg Load Cell Sensor",
    "slug": "5kg-load-cell-sensor",
    "category": "Sensor Modules",
    "shortDescription": "5kg-rated strain-gauge load cell for building a digital weighing scale.",
    "detailedDescription": "A straight-bar strain-gauge load cell rated for up to 5kg, converting applied weight into a small voltage change; used with an HX711 amplifier module to build a DIY digital weighing scale.",
    "price": 100.0,
    "stock": 100,
    "image": "https://www.electropi.in/image/cache/catalog/5kg-load-cell-400x400.jpg",
    "specifications": {
      "partNumber": "5kg Straight Bar Load Cell"
    }
  },
  {
    "id": "DEN2107",
    "name": "TCRT5000 Sensor Module",
    "slug": "tcrt5000-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Reflective IR sensor for line-following and close-range object detection.",
    "detailedDescription": "An IR reflective sensor (TCRT5000) that detects nearby surfaces/lines by measuring reflected IR light, with an onboard comparator giving digital output. Common in line-following robots and object-counting projects.",
    "price": 60.0,
    "stock": 100,
    "image": "https://roboticsdna.in/wp-content/uploads/2019/07/Untitled-123.jpg",
    "specifications": {
      "partNumber": "TCRT5000"
    }
  },
  {
    "id": "DEN2108",
    "name": "MT3608 DC to DC Power Boost Module",
    "slug": "mt3608-dc-to-dc-power-boost-module",
    "category": "Power",
    "shortDescription": "Adjustable step-up (boost) converter module for boosting a lower DC voltage.",
    "detailedDescription": "An adjustable boost converter module built around the MT3608 IC, stepping up a lower input voltage to a higher user-set output via an onboard trimmer, at moderate current. Similar use-case to the XL6009 module for powering higher-voltage loads from a lower-voltage battery.",
    "price": 60.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/products/MT3608-Step-Up-module.jpg?v=1674121560",
    "specifications": {
      "partNumber": "MT3608"
    }
  },
  {
    "id": "DEN2109",
    "name": "Caster Wheel",
    "slug": "caster-wheel",
    "category": "Mechanical Equipments",
    "shortDescription": "Small swivel caster wheel used as a free-rolling support wheel on robot chassis.",
    "detailedDescription": "A small ball-caster/swivel wheel that provides a free-rolling third or fourth support point on a robot chassis, complementing the driven wheels for balance without adding steering complexity.",
    "price": 20.0,
    "stock": 100,
    "image": "https://content.misumi-ec.com/image/upload/t_product_main/v1/p/cn/product/series/110310971639/110310971639_20240123141158.jpg",
    "specifications": {
      "partNumber": "Generic Swivel Caster Wheel"
    }
  },
  {
    "id": "DEN2110",
    "name": "12V 30A 1 Channel 'T' Relay Module",
    "slug": "12v-30a-1-channel-t-relay-module",
    "category": "Relays",
    "shortDescription": "Heavy-duty single-channel relay module rated up to 30A, for high-current switching.",
    "detailedDescription": "A higher-current relay module (up to 30A at 12V) with an opto-isolated control input, used for switching heavy-current loads such as pumps, large motors, or high-power lighting that exceed the rating of standard 10A relay modules.",
    "price": 170.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/files/12V30ASingleChannelRelayModulewithOptocouplerHigh_LowLevelTrigger_2.jpg?v=1755932707",
    "specifications": {
      "partNumber": "Generic 30A T-Relay Module"
    }
  },
  {
    "id": "DEN2111",
    "name": "Small Float Level Control Switch",
    "slug": "small-float-level-control-switch",
    "category": "Sensor Modules",
    "shortDescription": "Mechanical float switch that toggles based on liquid level, for tank-level automation.",
    "detailedDescription": "A mechanical float switch that opens/closes a contact as liquid level rises or falls, used to trigger pumps or alarms in tank-level automation and overflow-protection projects.",
    "price": 120.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F10%2FP35-Small-Float-Level-1.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "Generic Float Switch"
    }
  },
  {
    "id": "DEN2112",
    "name": "A4988 Stepper Motor Driver Module",
    "slug": "a4988-stepper-motor-driver-module",
    "category": "Motor Drivers",
    "shortDescription": "Microstepping stepper motor driver, the standard driver for NEMA17-class steppers (e.g. 3D printers).",
    "detailedDescription": "A microstepping bipolar stepper driver built around the A4988 IC, supporting up to 1/16 microstepping and adjustable current limiting. The most common driver for NEMA17-class steppers in 3D printers and CNC projects.",
    "price": 85.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2015%2F12%2F32.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "A4988"
    }
  },
  {
    "id": "DEN2113",
    "name": "TB6600 Stepper Motor Driver Controller",
    "slug": "tb6600-stepper-motor-driver-controller",
    "category": "Motor Drivers",
    "shortDescription": "Higher-power external stepper driver box for larger NEMA23/34-class steppers.",
    "detailedDescription": "An enclosed, higher-current stepper driver (built around the TB6600 IC) supporting microstepping and higher voltage/current than board-mounted drivers like the A4988, used for larger NEMA23/NEMA34 steppers in CNC machines and larger automation projects.",
    "price": 450.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F09%2F43211-1.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "TB6600"
    }
  },
  {
    "id": "DEN2114",
    "name": "Ultrasonic Sensor Mounting Bracket For HC-SR04",
    "slug": "ultrasonic-sensor-mounting-bracket-for-hc-sr04",
    "category": "Mechanical Equipments",
    "shortDescription": "Plastic mounting bracket that holds an HC-SR04 ultrasonic sensor at an adjustable angle.",
    "detailedDescription": "A simple plastic bracket that mounts an HC-SR04 ultrasonic sensor to a robot chassis, with an adjustable tilt angle for aiming the sensor.",
    "price": 25.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2017%2F04%2F1.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "Generic HC-SR04 Bracket"
    }
  },
  {
    "id": "DEN2115",
    "name": "NRF Adapter Board 3.3V",
    "slug": "nrf-adapter-board-3-3v",
    "category": "Electronic Components",
    "shortDescription": "Regulator/adapter board that lets an NRF24L01 module run reliably from 5V logic.",
    "detailedDescription": "A small adapter board with an onboard 3.3V regulator and decoupling capacitor, letting an NRF24L01 wireless module (which needs stable 3.3V) be powered and interfaced reliably from a 5V Arduino board.",
    "price": 40.0,
    "stock": 100,
    "image": "https://roboticsdna.in/wp-content/uploads/2020/07/3.3V-Adapter-Board-for-24L01-Wireless-Module.jpg",
    "specifications": {
      "partNumber": "Generic NRF24L01 Adapter"
    }
  },
  {
    "id": "DEN2116",
    "name": "5MP Raspberry Pi Camera Module",
    "slug": "5mp-raspberry-pi-camera-module",
    "category": "Camera Modules",
    "shortDescription": "5-megapixel camera module for Raspberry Pi boards via the CSI camera port.",
    "detailedDescription": "A 5MP camera module (typically OV5647-based) that connects to a Raspberry Pi's dedicated CSI camera port via ribbon cable, used for image capture, video streaming, and computer-vision projects on Raspberry Pi.",
    "price": 280.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F03%2FSKU-10957.png&w=1920&q=90",
    "specifications": {
      "partNumber": "Generic RPi Camera (OV5647)"
    }
  },
  {
    "id": "DEN2117",
    "name": "DHT22 Temperature and Humidity Sensor Module",
    "slug": "dht22-temperature-and-humidity-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Higher-precision digital temperature/humidity sensor - the more accurate sibling of the DHT11.",
    "detailedDescription": "A digital temperature and humidity sensor offering wider range and better accuracy/resolution than the DHT11 (temperature -40 to 80°C, humidity 0-100%), used where more precise weather/environment readings are needed.",
    "price": 180.0,
    "stock": 100,
    "image": "https://robosap.in/wp-content/uploads/2025/10/DHT22-Single-Bus-Digital-Tempera.png",
    "specifications": {
      "partNumber": "DHT22"
    }
  },
  {
    "id": "DEN2118",
    "name": "DF Player Mini MP3 Player Module",
    "slug": "df-player-mini-mp3-player-module",
    "category": "Electronic Components",
    "shortDescription": "Standalone MP3 playback module that reads audio files from a MicroSD card, controlled over serial.",
    "detailedDescription": "A compact MP3 player module that plays audio files stored on a MicroSD card, controlled via simple serial commands from a microcontroller. Used for voice-prompt, alarm-sound, and background-music playback in embedded projects.",
    "price": 100.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2023%2F03%2F26.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "DFPlayer Mini"
    }
  },
  {
    "id": "DEN2119",
    "name": "Arduino Mega 2560 R3 Sensor Shield V2.0",
    "slug": "arduino-mega-2560-r3-sensor-shield-v2-0",
    "category": "Electronic Components",
    "shortDescription": "Breakout shield for the Mega 2560 that brings all pins out to labeled, easy-to-wire headers.",
    "detailedDescription": "A prototyping shield that stacks onto an Arduino Mega 2560, breaking out every pin to labeled 3-pin headers (signal/power/ground) for easy jumper-wire connections to sensors and modules, reducing wiring clutter on larger projects.",
    "price": 190.0,
    "stock": 100,
    "image": "https://thinkrobotics.com/cdn/shop/products/411010742b534210205.jpg?v=1577794127&width=1400",
    "specifications": {
      "partNumber": "Generic Mega Sensor Shield V2"
    }
  },
  {
    "id": "DEN2120",
    "name": "GT2 6mm 20 Teeth Timing Pulley",
    "slug": "gt2-6mm-20-teeth-timing-pulley",
    "category": "Mechanical Equipments",
    "shortDescription": "20-tooth GT2 timing pulley (6mm bore) for belt-driven motion systems.",
    "detailedDescription": "A GT2-profile timing pulley with 20 teeth and a 6mm bore, used with GT2 timing belt on stepper-motor-driven axes in 3D printers, CNC machines, and other belt-driven linear-motion mechanisms.",
    "price": 85.0,
    "stock": 100,
    "image": "https://techtonics.in/wp-content/uploads/2019/01/tech1893-2-300x300-1.webp",
    "specifications": {
      "partNumber": "GT2-20T-6mm Bore"
    }
  }
,
{
    "id": "DEN2121",
    "name": "NEMA17 4.4kg-cm Stepper Motor",
    "slug": "nema17-4-4kg-cm-stepper-motor",
    "category": "Motors",
    "shortDescription": "Standard NEMA17-frame bipolar stepper motor for 3D printers and CNC axes.",
    "detailedDescription": "A NEMA17-frame bipolar stepper motor rated at roughly 4.4kg-cm holding torque, the standard motor size for 3D printer axes and small CNC builds, typically driven via an A4988/TB6600-class driver.",
    "price": 550.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2016%2F05%2FNEMA17-4.2-kg-cm-Stepper-Motor.png&w=1920&q=90",
    "specifications": {
      "partNumber": "NEMA17"
    }
  },
  {
    "id": "DEN2122",
    "name": "Solenoid Water Air Valve 12V",
    "slug": "solenoid-water-air-valve-12v",
    "category": "Motors",
    "shortDescription": "12V electric solenoid valve for controlling water/air flow in automation projects.",
    "detailedDescription": "A 12V-actuated solenoid valve that opens/closes to control water or air flow, typically switched via a relay from a microcontroller. Used in automated irrigation, dispensing, and pneumatic-control projects.",
    "price": 250.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/files/12V_DC_1_2_Electric_Solenoid_Water_Air_Valve_Switch_Normally_Closed_1.jpg?v=1778568780",
    "specifications": {
      "partNumber": "Generic 12V Solenoid Valve"
    }
  },
  {
    "id": "DEN2123",
    "name": "ESP32 CAM Breakout Board",
    "slug": "esp32-cam-breakout-board",
    "category": "Development Boards",
    "shortDescription": "USB programmer/breakout board that makes flashing and powering the ESP32-CAM easier.",
    "detailedDescription": "A breakout/programmer board that the ESP32-CAM plugs into, adding a USB-to-serial chip and reset button so it can be programmed and powered via USB without manual wiring - the ESP32-CAM itself has no onboard USB port.",
    "price": 120.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fproduct%2F1150750%2FtPw6OWN0LyHKHSCK0c2fYpCIOFxQPqe0dyRaCGRo.webp&w=1920&q=90",
    "specifications": {
      "partNumber": "Generic ESP32-CAM Programmer/Breakout"
    }
  },
  {
    "id": "DEN2124",
    "name": "Servo Tester",
    "slug": "servo-tester",
    "category": "Motors",
    "shortDescription": "Standalone tool for testing/manually positioning servo motors without a microcontroller.",
    "detailedDescription": "A small handheld tool with a knob and mode switch that generates a servo PWM signal directly, letting you test and manually sweep a servo's position without wiring up a microcontroller - useful for quick servo checks and calibration.",
    "price": 100.0,
    "stock": 100,
    "image": "https://thinkrobotics.com/cdn/shop/files/SERVOMOTORTESTERII_jpg.webp?v=1737723109&width=1400",
    "specifications": {
      "partNumber": "Generic 3-Channel Servo Tester"
    }
  },
  {
    "id": "DEN2125",
    "name": "12V DC Brushless Cooling Fan",
    "slug": "12v-dc-brushless-cooling-fan",
    "category": "Motors",
    "shortDescription": "Small 12V brushless cooling fan for cooling electronics enclosures/heatsinks.",
    "detailedDescription": "A small 12V brushless DC fan used to actively cool electronics enclosures, power-supply boxes, or heatsinks on motor drivers and voltage regulators in higher-power projects.",
    "price": 70.0,
    "stock": 100,
    "image": "https://static1.industrybuying.com/products/industrial-automation/electronic-devices/cooling-fans/IND.COO.220707578_1691502475053.webp",
    "specifications": {
      "partNumber": "Generic 12V Brushless Fan"
    }
  },
  {
    "id": "DEN2126",
    "name": "R307S Optical Fingerprint Reader Sensor Module",
    "slug": "r307s-optical-fingerprint-reader-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Optical fingerprint scanner module for biometric access-control projects.",
    "detailedDescription": "An optical fingerprint sensor (R307S) that can enroll, store, and match fingerprints onboard, communicating over UART. Commonly used for DIY biometric door locks, attendance systems, and secure-access projects.",
    "price": 900.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2018%2F05%2FR307-Optical-Fingerprint-Reader-Sensor-Module.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "R307S"
    }
  },
  {
    "id": "DEN2127",
    "name": "R385 DC6-12V Water Pump",
    "slug": "r385-dc6-12v-water-pump",
    "category": "Motors",
    "shortDescription": "Submersible DC water pump (6-12V) for fountains, irrigation, and cooling projects.",
    "detailedDescription": "A submersible DC pump (R385 motor) rated 6-12V, offering higher flow than the smaller 3-5V submersible pumps - used for larger fountain, irrigation, or liquid-cooling projects.",
    "price": 200.0,
    "stock": 100,
    "image": "https://kitsguru.com/cdn/shop/files/R385-Mini-Aquarium-Water-Pump-1_720x.jpg?v=1729755736",
    "specifications": {
      "partNumber": "R385"
    }
  },
  {
    "id": "DEN2128",
    "name": "HD-W2 P10 Single Color Controller",
    "slug": "hd-w2-p10-single-color-controller",
    "category": "Display",
    "shortDescription": "Controller card for driving P10 single-color LED display panels.",
    "detailedDescription": "A controller card designed to drive single-color P10 LED matrix display panels, handling text/graphics rendering and panel scanning - used for building LED signage and scrolling-text display projects.",
    "price": 520.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/41iG6d1jvzL._SY300_SX300_QL70_FMwebp_.jpg",
    "specifications": {
      "partNumber": "HD-W2"
    }
  },
  {
    "id": "DEN2129",
    "name": "ADXL345 Triple Axis Accelerometer Sensor Module",
    "slug": "adxl345-triple-axis-accelerometer-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Digital 3-axis accelerometer (I2C/SPI), more precise than the analog ADXL335.",
    "detailedDescription": "A digital 3-axis accelerometer (I2C/SPI interface) offering configurable resolution and range, more precise and feature-rich than the analog ADXL335. Used for tilt-sensing, motion detection, and orientation tracking in robotics and wearables.",
    "price": 150.0,
    "stock": 100,
    "image": "https://m.media-amazon.com/images/I/51tcdq-2QNL.jpg",
    "specifications": {
      "partNumber": "ADXL345"
    }
  },
  {
    "id": "DEN2130",
    "name": "2S 20A 18650 Lithium Battery Protection Board",
    "slug": "2s-20a-18650-lithium-battery-protection-board",
    "category": "Batteries & Power Management",
    "shortDescription": "Battery management (protection) board for a 2-cell (2S) Li-ion pack, up to 20A.",
    "detailedDescription": "A BMS (battery management system) board for a 2-series (2S) 18650 Li-ion pack, protecting against overcharge, over-discharge, and short-circuit at up to 20A - essential safety circuitry for any custom multi-cell Li-ion pack.",
    "price": 100.0,
    "stock": 100,
    "image": "https://robu.in/_next/image/?url=https%3A%2F%2Frobu-prod-media.s3.ap-south-1.amazonaws.com%2Fuploads%2F2019%2F11%2F2S-20A-18650-Lithium-Battery-Protection-Board-4.jpg&w=1920&q=90",
    "specifications": {
      "partNumber": "2S 20A BMS"
    }
  },
  {
    "id": "DEN2131",
    "name": "3S 10A 18650 Lithium Battery Protection Board",
    "slug": "3s-10a-18650-lithium-battery-protection-board",
    "category": "Batteries & Power Management",
    "shortDescription": "Battery management (protection) board for a 3-cell (3S) Li-ion pack, up to 10A.",
    "detailedDescription": "A BMS board for a 3-series (3S) 18650 Li-ion pack rated up to 10A, protecting against overcharge, over-discharge, and short-circuit - used when building a 3-cell (~11.1V) custom battery pack.",
    "price": 150.0,
    "stock": 100,
    "image": "https://roboticsdna.in/wp-content/uploads/2021/12/3S-BMS.jpg",
    "specifications": {
      "partNumber": "3S 10A BMS"
    }
  },
  {
    "id": "DEN2132",
    "name": "4S 40A 18650 Lithium Battery Protection Board",
    "slug": "4s-40a-18650-lithium-battery-protection-board",
    "category": "Batteries & Power Management",
    "shortDescription": "Higher-current battery management board for a 4-cell (4S) Li-ion pack, up to 40A.",
    "detailedDescription": "A higher-current BMS board for a 4-series (4S) 18650 Li-ion pack rated up to 40A, suited for higher-power packs (e.g. ~14.8V robotics/e-bike style builds) needing more current headroom than a basic protection board.",
    "price": 200.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR_BQ3MpUXJayinNAQCGc2VLL59S4aQCh28o6ZL_Xu303r4TicEp0vjhVyZJ26n_31aL9i64-WZJwIZ4SDOslmQqhigX1Bu24Z43NMCc3mVsUrlJLXiXEM965178bhlzvrnTVMBIw&usqp=CAc",
    "specifications": {
      "partNumber": "4S 40A BMS"
    }
  },
  {
    "id": "DEN2133",
    "name": "RS232 to TTL Serial Interface Module",
    "slug": "rs232-to-ttl-serial-interface-module",
    "category": "Module",
    "shortDescription": "Converts RS232 (PC serial port) voltage levels to TTL for microcontroller communication.",
    "detailedDescription": "A level-converter module (typically MAX232-based) that translates RS232 voltage levels (used by PC serial ports and older industrial equipment) to TTL levels a microcontroller can read directly, and vice versa.",
    "price": 60.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRKil_ZAZoquCNxIy1Eh22WjcUQ7wSL1b0zOZb9LqX6QEDcQuWai0qhsR_5nOHOoNQCWBYlZGVZJ3llyjq8STn6uDXMiIl4cPtNwXrOmwvIKWt91J-sU_MhmF1fbrq5Q9JZH-brsyQ&usqp=CAc",
    "specifications": {
      "partNumber": "MAX232-based Module"
    }
  },
  {
    "id": "DEN2134",
    "name": "MAX485 TTL to RS485 Module",
    "slug": "max485-ttl-to-rs485-module",
    "category": "Module",
    "shortDescription": "Converts TTL serial to RS485 for longer-distance, multi-device industrial communication.",
    "detailedDescription": "A module built around the MAX485 IC that converts TTL UART signals to the RS485 differential standard, enabling longer cable runs (up to ~1200m) and multi-drop networking of several devices - commonly used for Modbus and industrial sensor networks.",
    "price": 80.0,
    "stock": 100,
    "image": "https://cdn.zbotic.in/wp-content/uploads/2022/04/Untitled-design.png.webp",
    "specifications": {
      "partNumber": "MAX485"
    }
  },
  {
    "id": "DEN2135",
    "name": "4V 1A Rechargeable Sealed Lead Acid Battery",
    "slug": "4v-1a-rechargeable-sealed-lead-acid-battery",
    "category": "Batteries & Power Management",
    "shortDescription": "Small sealed lead-acid battery (4V, 1Ah) for backup power and low-power project builds.",
    "detailedDescription": "A small sealed lead-acid (SLA) rechargeable battery rated 4V, 1Ah, commonly used for backup power, emergency lighting, or low-drain project power where Li-ion isn't required.",
    "price": 50.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFD10tdG39n7iwE1mBYS47ndIvSpYZsmRG8xy5nS8m2w&s=10",
    "specifications": {
      "partNumber": "4V 1Ah SLA Battery"
    }
  },
  {
    "id": "DEN2136",
    "name": "12V Lead Acid Battery 1.3Ah",
    "slug": "12v-lead-acid-battery-1-3ah",
    "category": "Batteries & Power Management",
    "shortDescription": "Sealed lead-acid battery (12V, 1.3Ah) for alarm systems, backup power, and small robotics.",
    "detailedDescription": "A 12V, 1.3Ah sealed lead-acid battery commonly used in alarm-system backup power, small UPS builds, and robotics projects needing a compact 12V rechargeable source.",
    "price": 300.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQYFcqP21NqrTsMx2CvPTURQAqTYbsbJKhxVwFw1YXFID1aT3ILeoNxzJJ-6anhAGX9wpYxB5t9x8TnKUDNnNn6YllSOnVZjTIJhqPmwRb8cWHTtwxCgxjwjdfBQT0GGHxogwluEg&usqp=CAc",
    "specifications": {
      "partNumber": "12V 1.3Ah SLA Battery"
    }
  },
  {
    "id": "DEN2137",
    "name": "400KV Step Up Power Module",
    "slug": "400kv-step-up-power-module",
    "category": "Power",
    "shortDescription": "High-voltage boost module that steps a low DC input up to several hundred volts.",
    "detailedDescription": "A high-voltage boost converter that steps up a low DC input (e.g. a few volts) to several hundred volts output, used in DIY high-voltage demonstration projects (e.g. small sparker/plasma experiments) - handle with caution given the high output voltage.",
    "price": 180.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQEWiS3uOWLad2yZyeo3Bf-PJV0SEXWSUUdzZ4eVEKh0dzI7IyuKd78eUc98qtPUavbs8KPgzlzHJKKIMnnDR4R3O_McvZggZ5-I7LWokWx31i2uToXDo7BBRCc47Xr0VAbwwf4f3I&usqp=CAc",
    "specifications": {
      "partNumber": "Generic High-Voltage Boost Module"
    }
  },
  {
    "id": "DEN2138",
    "name": "MB102 Breadboard Power Supply Module",
    "slug": "mb102-breadboard-power-supply-module",
    "category": "Power",
    "shortDescription": "Plug-on power module that supplies 3.3V/5V directly to a solderless breadboard's power rails.",
    "detailedDescription": "A power-supply module that clips directly onto a standard solderless breadboard's power rails, providing selectable 3.3V and 5V outputs from a DC barrel-jack or USB input - a convenient way to power breadboard circuits without extra wiring.",
    "price": 80.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcT3X64T3-7rUO-b3NzqoKHHtEVBzYR6dZJaRvMCJypuwIyTuEkjEq-aX1i2rV0ofPsa8ybuwVnP0_Wi4aOmD5NDYNSyhj5ChQTKOmR__pjmiavsqMLrx84QUk0U-ITDgJuCx_H88IY&usqp=CAc",
    "specifications": {
      "partNumber": "MB102"
    }
  },
  {
    "id": "DEN2139",
    "name": "NRF24L01 2.4GHz RF Transceiver Module",
    "slug": "nrf24l01-2-4ghz-rf-transceiver-module",
    "category": "Wireless",
    "shortDescription": "Standard short/medium-range 2.4GHz wireless transceiver module (SPI interface).",
    "detailedDescription": "The standard version of the NRF24L01 2.4GHz transceiver with onboard PCB antenna, communicating over SPI - used for short-to-medium range wireless links between two or more microcontrollers in sensor networks and remote-control projects.",
    "price": 90.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcT4b-7ibkY_aT7tRaNpEJcO2FtbAOOglvqRkq8LGI-cmzGeEHiPRIXeMFbd9RWgRLxeSgnXoC5vQxVl4dynPCIlWKXXgSL2dHrFbQbjLnDxDA5ito8gzmR3Csu8y0WNVWn1pZ7R-g&usqp=CAc",
    "specifications": {
      "partNumber": "NRF24L01"
    }
  },
  {
    "id": "DEN2140",
    "name": "LCD 20x4 Parallel LCD Display",
    "slug": "lcd-20x4-parallel-lcd-display",
    "category": "Display",
    "shortDescription": "Larger 20-column, 4-row character LCD for displaying more text than a 16x2.",
    "detailedDescription": "A 20-column, 4-row character LCD based on the HD44780 controller, offering more display space than the common 16x2 for showing multi-line menus, logs, or sensor data.",
    "price": 450.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSSd1G5qIZkUQCbvrt9ybwdhosDlTu7V0LfFpU045e5-ZNZWzTUG-RrzpFHCtmrOJaEuc_raOh3fLq5htspCBNxHDnsj7whXbCDSxFvChCFbVD70pDW1PnbP-aMaEhZr4kfHMb6kg&usqp=CAc",
    "specifications": {
      "partNumber": "HD44780 20x4"
    }
  },
  {
    "id": "DEN2141",
    "name": "MCP2515 CAN Module",
    "slug": "mcp2515-can-module",
    "category": "Module",
    "shortDescription": "CAN bus interface module (SPI) for connecting a microcontroller to a CAN network.",
    "detailedDescription": "An SPI-to-CAN interface module built around the MCP2515 controller and TJA1050 transceiver, letting a microcontroller communicate on a CAN bus - commonly used in automotive (OBD-II) and industrial CAN-network projects.",
    "price": 120.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTxUJ9BnbLW_tw0ucaTgiCnUVlCjtGkOExQgkPkCp5SOYprVYK-ruAuBIEvrK39Jl-BsTLN2AhY5_Vba6LwNP4voWjzmcwovWl_xaIHKca9KYj-RJrAHkLAQXH1iAT3qfe3bwfv7Kc&usqp=CAc",
    "specifications": {
      "partNumber": "MCP2515"
    }
  },
  {
    "id": "DEN2142",
    "name": "PAM8403 Audio Amplifier",
    "slug": "pam8403-audio-amplifier",
    "category": "Electronic Components",
    "shortDescription": "Small stereo class-D audio amplifier module for driving small speakers.",
    "detailedDescription": "A compact 2x3W class-D stereo audio amplifier module built around the PAM8403 IC, used to boost a line-level audio signal (e.g. from a DFPlayer Mini or phone) to drive a pair of small speakers.",
    "price": 25.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRc300206cKck_sO6C-AkIwBIyuM1caRV8B7DCiYZK50_6JDqNkR4A9whzEuIYEs460Xn1VaUpR-s7ClcWEvbBvBSAsT45K5xSkU1kns6vwW3h5m5B-qj_7QCR-cZWcPIq4ZqATtfw&usqp=CAc",
    "specifications": {
      "partNumber": "PAM8403"
    }
  },
  {
    "id": "DEN2143",
    "name": "AD8232 ECG Sensor with ECG Cable and Electrodes",
    "slug": "ad8232-ecg-sensor-with-ecg-cable-and-electrodes",
    "category": "Sensor Modules",
    "shortDescription": "Single-lead ECG (heart signal) front-end module with cable and disposable electrodes.",
    "detailedDescription": "A single-lead ECG analog front-end module built around the AD8232 IC, supplied with an electrode cable and disposable electrode pads, used for DIY heart-signal (ECG waveform) monitoring and biosignal-processing projects.",
    "price": 800.0,
    "stock": 100,
    "image": "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSg4rXWj8ILSbcEbFwmiDGg9NTuOakapZWyJ6uKDD5S5o31qLtkyinybi3UgTSUS9SXTrcVDO3PXiOI4cfX_Pu8M50aBjkTyIHZgaIfHrZcDjUxGXspQocdZRLY8vHdOUITje38mA&usqp=CAc",
    "specifications": {
      "partNumber": "AD8232"
    }
  },
  {
    "id": "DEN2144",
    "name": "DS3231 RTC Module",
    "slug": "ds3231-rtc-module",
    "category": "Module",
    "shortDescription": "Higher-accuracy real-time clock module than the DS1307, with a temperature-compensated crystal.",
    "detailedDescription": "A real-time clock module built around the DS3231, which uses a temperature-compensated crystal oscillator for significantly better timekeeping accuracy than the DS1307, with battery backup - preferred where long-term timing accuracy matters.",
    "price": 180.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSFmpMrs8C4Qs7cGbxc5RbUVFOqdSfvZHC7xaY1zl5MO8sJne1KYWfZQI1Np8PTznvXEgpvHd0C-6w5VimnDr3JNBAYjWfiUpaGmVWHDKO2FfEsfZuAbgCexPUQtRw_eZPuw0GjPyQ&usqp=CAc",
    "specifications": {
      "partNumber": "DS3231"
    }
  },
  {
    "id": "DEN2145",
    "name": "MQ4 Methane Natural Gas Sensor Module",
    "slug": "mq4-methane-natural-gas-sensor-module",
    "category": "Sensor Modules",
    "shortDescription": "Detects methane and natural gas concentrations.",
    "detailedDescription": "A metal-oxide gas sensor tuned for methane and natural gas (CNG) detection, giving analog and threshold digital outputs - used for gas-leak alarms in kitchens and gas-line safety projects.",
    "price": 120.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTQbJh6qL8PbmZHrbzLEFMMneqHi_9iVIiaJ0Hu4d8N3uWxzPDZ5cqA0gUahbhLe06FnsXo1Ohv8lrg7_qVHvrrDm8ImyVbs1PgXVosgI4Ln8MU9zkbcTZ3F26iJMsRzyvm_SlTdXQ&usqp=CAc",
    "specifications": {
      "partNumber": "MQ-4"
    }
  },
  {
    "id": "DEN2146",
    "name": "MAX7219 LED Dot Matrix 4-in-1 Display Module",
    "slug": "max7219-led-dot-matrix-4-in-1-display-module",
    "category": "Display",
    "shortDescription": "Chained 8x8 LED dot-matrix display board (4 modules) driven over SPI, for scrolling text/graphics.",
    "detailedDescription": "Four cascaded 8x8 LED dot-matrix modules driven by MAX7219 chips over a simple SPI-like interface, used for scrolling text messages, simple graphics, and clock/counter displays.",
    "price": 270.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTh89lRgpG6K0_ZI2crqM0XkBrQrOr-9mmUVpQN8UTchowbN5Y1wGtRAIpOl-Eann74us5A6dUAfvveRiFxct35_W5ayq74LNheu7nMOlx4sx8rmoP9_fZKsQto9g&usqp=CAc",
    "specifications": {
      "partNumber": "MAX7219"
    }
  },
  {
    "id": "DEN2147",
    "name": "Raspberry Pi Pico",
    "slug": "raspberry-pi-pico",
    "category": "Development Boards",
    "shortDescription": "Low-cost microcontroller board built around the dual-core RP2040 chip.",
    "detailedDescription": "A compact, low-cost microcontroller board (not a full Linux computer) built around Raspberry Pi's own dual-core RP2040 chip, programmable in MicroPython or C/C++. Popular for cost-sensitive embedded projects needing more performance than an 8-bit Arduino.",
    "price": 410.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSYrDd5lV9aenRr6LWP_OsHgNGkG0au6LrBCSGW4FzPFpg8TW1Gx1XSzyQ6X-kEiqGyy04GviMFzU8eL0pMhCpFpPFb18u2E2sbMunLyGaTyTqGXJVoxKh5DW8pww6TvHZD3_h2bmw&usqp=Cac",
    "specifications": {
      "partNumber": "RP2040"
    }
  },
  {
    "id": "DEN2148",
    "name": "Bluetooth 3.0 Stereo Audio Receiver Module",
    "slug": "bluetooth-3-0-stereo-audio-receiver-module",
    "category": "Wireless",
    "shortDescription": "Bluetooth audio receiver module for streaming stereo audio into an amplifier/speaker circuit.",
    "detailedDescription": "A Bluetooth 3.0 audio receiver module that pairs with a phone/PC and outputs a line-level stereo audio signal, used to add wireless audio streaming into a DIY speaker or amplifier project.",
    "price": 70.0,
    "stock": 100,
    "image": "https://quartzcomponents.com/cdn/shop/files/Bluetooth_3.0_Audio_Receiver_Module_with_Stereo_Output.jpg?v=1776851673",
    "specifications": {
      "partNumber": "Generic BT Audio Receiver"
    }
  },
  {
    "id": "DEN2149",
    "name": "Limit Switch Module",
    "slug": "limit-switch-module",
    "category": "Sensor Modules",
    "shortDescription": "Mechanical limit switch for end-stop detection in CNC/3D-printer style axes.",
    "detailedDescription": "A lever-actuated mechanical microswitch used as an end-stop/limit switch on 3D-printer and CNC axes, or as a simple mechanical trigger (door open, lid closed) in other projects.",
    "price": 60.0,
    "stock": 100,
    "image": "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQni_lUigEpCr8zRSdOfyDZeoB8pGhuO23ctYSwfBwfDALPgJlsU-3lal6IqB-HkD4uCXAtObNuBBS31xuMw8D2AOyVip8Vcp6xYyN7nhSeL0g8NnjrxArEuPLwfhb8jRidYQQddtI&usqp=CAc",
    "specifications": {
      "partNumber": "Generic Microswitch Limit Switch"
    }
  },
  {
    "id": "DEN2150",
    "name": "ESP8266 NodeMCU CH340",
    "slug": "esp8266-nodemcu-ch340",
    "category": "Development Boards",
    "shortDescription": "NodeMCU WiFi board with CH340 USB-to-serial chip, an alternative to the CP2102 variant.",
    "detailedDescription": "The same NodeMCU-format ESP8266 WiFi board as the CP2102 variant, but using a CH340 USB-to-serial chip instead - functionally equivalent, just needs the CH340 driver installed on the programming PC.",
    "price": 250.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQs7lPKFUxYR6Tkpybt9ti0Z3tjm7wevHRnAhzPAPiY1d2VDL6865G8Bn5lalQKUvzBZmJSdgv-Ew9AmfKq-J8AhRrOzP86MC_htB3Xp3e4prZg6SkJVtxvF-rDIDP8lL2l8b12vA&usqp=CAc",
    "specifications": {
      "partNumber": "ESP8266 / CH340"
    }
  },
  {
    "id": "DEN2151",
    "name": "4.3 Inch TFT LCD Display 480x272 No Touch",
    "slug": "4-3-inch-tft-lcd-display-480x272-no-touch",
    "category": "Display",
    "shortDescription": "4.3 inch TFT LCD Module Display, 480x272 Dot, Serial RGB Display Format: 480x272 dots",
    "detailedDescription": "Display Size: 4.3-inch TFT LCD module for compact embedded applications.\nResolution: 480 x 272 pixels for clear and detailed graphical display.\nInterface: Serial RGB interface for easy integration with embedded controllers.\nDisplay Format: Wide 16:9 aspect ratio, suitable for HMI and control-panel applications.\nApplications: Industrial equipment, automotive systems, medical devices, IoT products, and consumer electronics",
    "price": 1089.0,
    "stock": 100,
    "image": "https://www.sindadisplay.com/public/uploads/images/20230918/de1aba6dca1f213ce6883303446c1844.png",
    "specifications": {
      "partNumber": "SDT04302T-A40"
    }
  },
  {
    "id": "DEN2152",
    "name": "7.0 Inch TFT LCD Display 800x480 No Touch",
    "slug": "7-0-inch-tft-lcd-display-800x480-no-touch",
    "category": "Display",
    "shortDescription": "7 inch TFT LCD Module Display, 800x480 Dot, Serial RGB Display Format: 800x480 dots",
    "detailedDescription": "Display Size: 7-inch TFT LCD module designed for embedded and HMI applications.\nResolution: 800 x 480 pixels for clear and vibrant graphical content.\nInterface: Serial RGB interface for reliable connection with microcontrollers and processors.\nDisplay Format: Wide 16:9 format, ideal for modern graphical user interfaces.\nApplications: Industrial HMI, automotive displays, medical equipment, smart appliances, IoT devices, and control panels.",
    "price": 1600.0,
    "stock": 100,
    "image": "https://www.sindadisplay.com/public/uploads/images/20230918/ace7e6070d7ca8b8f194cb1c7c6e7da6.png",
    "specifications": {
      "partNumber": "SDT07002N-A40"
    }
  },
  {
    "id": "DEN2153",
    "name": "10.1 Inch TFT LCD Display 1024x600 No Touch",
    "slug": "10-1-inch-tft-lcd-display-1024x600-no-touch",
    "category": "Display",
    "shortDescription": "10.1inch TFT LCD Module Display, 1024x600 Dot Display Format: 1024x600 dots",
    "detailedDescription": "Display Size: 10.1-inch TFT LCD display designed for embedded and industrial applications.\nResolution: 1024 x 600 pixels for sharp and detailed graphical content.\nTouch: Non-touch display, suitable for applications requiring a standard LCD interface.\nDisplay Format: Wide-screen 16:9 format for an enhanced viewing experience.\nApplications: Industrial HMI, automotive systems, medical equipment, automation panels, smart devices, and IoT applications.",
    "price": 2500.0,
    "stock": 100,
    "image": "https://www.sindadisplay.com/public/uploads/images/20230918/a8466d3642b74fc514274719d3b45bcc.png",
    "specifications": {
      "partNumber": "SDT10101N-A60"
    }
  },
  {
    "id": "DEN2154",
    "name": "STONE HMI Display - 4.3 inch Resistive Touch",
    "slug": "stone-hmi-display---4-3-inch-resistive-touch",
    "category": "Supplier Brand",
    "shortDescription": "4.3-inch 480x272 industrial class TFT LCD Module Display",
    "detailedDescription": "4.3-inch 480x272 industrial class TFT LCD Module Display\n4-wire resistance Touch Screen; Brightness 500cd/m2\nLED backlight, RGB Color 65k\n32bit Cortex A8 1GHz CPU; TFT-LCD Controller\nUSB port (U-Disk) downloading\nFree GUI design software; Simple & Powerful HEX Instruction",
    "price": 2700.0,
    "stock": 100,
    "image": "https://www.stoneitech.com/wp-content/uploads/2021/11/P3A0964_9-1024x1024.webp",
    "specifications": {
      "partNumber": "STWI043WT-01"
    }
  },
  {
    "id": "DEN2155",
    "name": "STONE HMI Display - 7.0 inch Resistive Touch",
    "slug": "stone-hmi-display---7-0-inch-resistive-touch",
    "category": "Supplier Brand",
    "shortDescription": "7-inch 800x480 industrial class TFT LCD Module Display",
    "detailedDescription": "7-inch 800x480 industrial class TFT LCD Module Display\n4-wire resistance Touch Screen; Brightness 300cd/m2\nLED backlight, RGB Color 262k\nCortex A8 1GHz CPU; TFT-LCD Controller\nUSB port (U-Disk) downloading\nFree GUI design software; Simple & Powerful JSON Instruction",
    "price": 2970.0,
    "stock": 100,
    "image": "https://www.stoneitech.com/wp-content/uploads/2021/12/P3A1065_8-1024x1024.webp",
    "specifications": {
      "partNumber": "STWI070WT-01"
    }
  },
  {
    "id": "DEN2156",
    "name": "STONE HMI Display - 10.1 inch Resistive Touch",
    "slug": "stone-hmi-display---10-1-inch-resistive-touch",
    "category": "Supplier Brand",
    "shortDescription": "10.1-inch 1024x600 industrial class TFT LCD Module Display",
    "detailedDescription": "10.1-inch 1024x600 industrial class TFT LCD Module Display\n4-wire resistance Touch Screen; Brightness 400cd/m2\nLED backlight, RGB Color 65k\n32bit Cortex A8 1GHz CPU; TFT-LCD Controller\nUSB port (U-Disk) downloading\nFree GUI design software; Simple & Powerful HEX Instruction",
    "price": 5132.0,
    "stock": 100,
    "image": "https://www.stoneitech.com/wp-content/uploads/2021/12/P3A0869_8-1024x1024.webp",
    "specifications": {
      "partNumber": "STWI101WT-01"
    }
  },
  {
    "id": "DEN2157",
    "name": "DWIN HMI Display- 4.3 inch Resistive Touch",
    "slug": "dwin-hmi-display--4-3-inch-resistive-touch",
    "category": "Supplier Brand",
    "shortDescription": "4.3 Inch Intelligent Display DMG48270C043_04W Commercial grade",
    "detailedDescription": "4.3-inch intelligent TFT display suitable for compact HMI applications.\nResolution: 480 x 272 pixels for clear and detailed graphical visualization.\nIntelligent HMI: Built-in processing capability reduces the workload on the host MCU.\nCommercial Grade: Designed for reliable operation in commercial and consumer electronic applications.\nApplications: Industrial control panels, smart appliances, IoT devices, medical equipment, instrumentation, and automation systems.",
    "price": 1800.0,
    "stock": 100,
    "image": "https://ecdn6.globalso.com/upload/p/1355/source/2024-11/673c3a82ae33158189.jpg",
    "specifications": {
      "partNumber": "DMG48270C043_04WTR"
    }
  },
  {
    "id": "DEN2158",
    "name": "DWIN HMI Display- 7.0 inch Resistive Touch",
    "slug": "dwin-hmi-display--7-0-inch-resistive-touch",
    "category": "Supplier Brand",
    "shortDescription": "7 Inch HMI LCD Display Touch Panel Model:DMG80480C070_04W Commercial grade",
    "detailedDescription": " 7-inch intelligent HMI TFT LCD display for graphical interface applications.\nResolution: 800 x 480 pixels, providing clear and detailed visual output.\nTouch Panel: Integrated touch panel enables intuitive and user-friendly operation.\nCommercial Grade: Designed for reliable performance in commercial and consumer applications.\nApplications: Industrial HMI, automation equipment, smart appliances, medical instruments, IoT devices, and control panels.",
    "price": 2600.0,
    "stock": 100,
    "image": "https://ecdn6.globalso.com/upload/p/1355/source/2024-11/673c39a453bff35308.jpg",
    "specifications": {
      "partNumber": "DMG80480C070_04WTR"
    }
  },
  {
    "id": "DEN2159",
    "name": "DWIN HMI Display- 10.1 inch Capacitive Touch",
    "slug": "dwin-hmi-display--10-1-inch-capacitive-touch",
    "category": "Supplier Brand",
    "shortDescription": "10.1 Inch HMI Touch Monitor DMG10600C101_03W Commercial Grade",
    "detailedDescription": " 10.1-inch intelligent HMI TFT LCD display for graphical interface applications.\nResolution: 1024 x 600 pixels, providing clear and detailed visual output.\nTouch Panel: Integrated touch panel enables intuitive and user-friendly operation.\nCommercial Grade: Designed for reliable performance in commercial and consumer applications.\nApplications: Industrial HMI, automation equipment, smart appliances, medical instruments, IoT devices, and control panels.",
    "price": 5800.0,
    "stock": 100,
    "image": "https://ecdn6.globalso.com/upload/p/1355/source/2025-03/67d3868f74e9228165.jpg",
    "specifications": {
      "partNumber": "DMG10600C101_03WTC"
    }
  },
  {
    "id": "DEN2160",
    "name": "Obstacle Avoiding Robot Car Kit",
    "slug": "obstacle-avoiding-robot-car-kit",
    "category": "Robotics Project Kits",
    "shortDescription": "Complete robotic car kit designed for obstacle avoidance learning.",
    "detailedDescription": "Robot Type: Educational autonomous robot car designed to detect and avoid obstacles automatically.\nObstacle Detection: Uses ultrasonic/IR sensors to detect objects in the robot's path.\nControl System: Microcontroller-based platform for processing sensor inputs and controlling motor movement.\nMovement: Supports forward, backward, left, and right movement with automatic direction adjustment.\nApplications: Robotics education, STEM learning, embedded projects, Arduino training, workshops, and student experiments.",
    "price": 4400.0,
    "stock": 100,
    "image": "https://ai.thestempedia.com/wp-content/uploads/2023/05/Obstacle-Avoiding-Toy-Car.jpg",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2161",
    "name": "WiFi Controlled Bionic Robotic Hand",
    "slug": "wifi-controlled-bionic-robotic-hand",
    "category": "Robotics Project Kits",
    "shortDescription": "Wireless-enabled bionic hand robotics kit.",
    "detailedDescription": "Robotic Type: Bionic robotic hand designed to demonstrate human-like gripping and finger movements.\nWireless Control: Wi-Fi-enabled control allows remote operation through a smartphone, computer, or wireless interface.\nMovement: Multiple servo motors provide controlled movement of individual fingers for different gripping actions.\nControl System: Microcontroller-based architecture enables wireless commands, motor control, and programmable movements.\nApplications: Robotics education, STEM learning, IoT projects, automation, prosthetic research demonstrations, and robotics workshops.",
    "price": 8800.0,
    "stock": 100,
    "image": "https://content.instructables.com/F7H/ZHZO/JEST3IAN/F7HZHZOJEST3IAN.jpg?auto=webp&frame=1",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2162",
    "name": "Bluetooth Controlled Robot Car Kit",
    "slug": "bluetooth-controlled-robot-car-kit",
    "category": "Robotics Project Kits",
    "shortDescription": "Educational robot car kit with Bluetooth remote control.",
    "detailedDescription": "Robot Type: Educational robotic car designed for wireless control and hands-on robotics learning.\nBluetooth Control: Enables remote operation using a smartphone or Bluetooth-enabled controller.\nMovement: Supports forward, backward, left, and right directional movement with motorized drive.\nControl System: Microcontroller-based platform for processing Bluetooth commands and controlling motors.\nApplications: Robotics education, STEM learning, Arduino projects, embedded systems training, workshops, and student experiments.",
    "price": 2589.0,
    "stock": 100,
    "image": "https://robocraze.com/cdn/shop/files/1_2d942dd3-06ad-45b4-9616-3d65740ab851_1000x.png?v=1754484573",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2163",
    "name": "4/5 DOF Robotic Arm Kit",
    "slug": "4-5-dof-robotic-arm-kit",
    "category": "Robotics Project Kits",
    "shortDescription": "Multi-axis robotic arm kit for learning inverse kinematics and automation.",
    "detailedDescription": "Robotic Type: Educational robotic arm kit designed for hands-on learning and automation projects.\nDegrees of Freedom: 4/5 DOF configuration provides multiple axes of movement for flexible positioning.\nMovement & Control: Servo motor-based mechanism enables precise arm, joint, and gripper movements.\nProgrammable: Suitable for microcontroller-based programming, motion control, and robotics experimentation.\nApplications: Robotics education, STEM training, pick-and-place projects, automation demonstrations, and college workshops.",
    "price": 4500.0,
    "stock": 100,
    "image": "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSbvXTlZZvB8Gf3l75DeD2NSU6ig0bVI76NIl-vl6-AUS2Eg4EIOQZDCBdBDcEFUTogUqOKakzXjThkz2cPQxXoVS7lR5BbMYxRkz7c1esFI7XyJlZaUifD0xu9j57Gj9p3CtZ2snI&usqp=CAc",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2164",
    "name": "Automatic Smart Dustbin",
    "slug": "automatic-smart-dustbin",
    "category": "Robotics Project Kits",
    "shortDescription": "Sensor-based automated dustbin project kit.",
    "detailedDescription": "Smart Operation: Automatically opens the lid when a user or object is detected nearby.\nSensor-Based: Uses an ultrasonic or proximity sensor for touch-free operation.\nAutomatic Control: Microcontroller-based system controls the sensor and lid-opening mechanism.\nHygienic Design: Touchless operation helps improve cleanliness and reduce direct contact.\nApplications: Smart homes, offices, schools, hospitals, public areas, and IoT-based projects.",
    "price": 2600.0,
    "stock": 100,
    "image": "https://static.wixstatic.com/media/59035a_7e8ca15aef4741999f8772b78b45c2c6~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpg",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2165",
    "name": "Automatic Fire Fighting Robot",
    "slug": "automatic-fire-fighting-robot",
    "category": "Robotics Project Kits",
    "shortDescription": "Autonomous robot kit equipped to detect and extinguish small fires.",
    "detailedDescription": "Robot Type: Autonomous robotic system designed to detect and respond to small fire sources.\nFire Detection: Uses flame/fire sensors to identify the presence and direction of a fire.\nAutomatic Operation: Microcontroller-based control enables the robot to navigate toward the detected fire.\nFire Extinguishing: Integrated pump/fan mechanism helps suppress the detected flame automatically.\nApplications: Robotics education, STEM projects, fire-safety demonstrations, automation training, and college workshops.",
    "price": 3900.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqvIvl9ZYil0XlN5hqP8ZNswYqG3Ne-Fnhlwyg5HLIYw&s=10",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2166",
    "name": "Automatic Line Following Robot",
    "slug": "automatic-line-following-robot",
    "category": "Robotics Project Kits",
    "shortDescription": "Autonomous mobile robot designed to follow a predefined line.",
    "detailedDescription": "Robot Type: Autonomous mobile robot designed to follow a predefined line or track automatically.\nLine Detection: Uses IR/reflective sensors to detect the line and determine the robot's position.\nAutomatic Navigation: Microcontroller-based control adjusts motor speed and direction to maintain the track.\nMovement: Differential motor drive enables smooth forward movement and controlled turns along the path.\nApplications: Robotics education, STEM learning, embedded programming, automation projects, workshops, and competitions.",
    "price": 2800.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROl0O6_8mopjJ-KMR8p4ydfng33-ErkeaRJxfbJc96ww&s=10",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2167",
    "name": "WiFi Controlled ESP32 Robot Car",
    "slug": "wifi-controlled-esp32-robot-car",
    "category": "Robotics Project Kits",
    "shortDescription": "ESP32-based smart robotic car for wireless control and IoT integration.",
    "detailedDescription": "Robot Type: Smart robotic car based on the ESP32 microcontroller for wireless robotics applications.\nWi-Fi Control: Enables remote control through a smartphone, web interface, or Wi-Fi-enabled controller.\nMovement: Supports forward, backward, left, and right movement with motorized drive control.\nESP32 Platform: Provides integrated Wi-Fi connectivity, processing capability, and flexible GPIO interfaces for sensors and peripherals.\nApplications: IoT projects, robotics education, STEM learning, embedded systems training, automation, and college workshops.",
    "price": 4399.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkyIrNGU33Hny14ltzYJBSIzRASk6s9tC6cSHkP2oHvQ&s=10",
    "specifications": {
      "partNumber": "N/A"
    }
  },
  {
    "id": "DEN2168",
    "name": "WiFi Antenna - 2.4 GHZ & 5 GHZ",
    "slug": "wifi-antenna---2-4-ghz-&-5-ghz",
    "category": "RF Antenna",
    "shortDescription": "Wi-Fi 6 Dual Band Internal Antenna with Connectorized Cable.",
    "detailedDescription": "Frequency: Dual-band Wi-Fi antenna supporting both 2.4 GHz and 5 GHz frequency bands.\nConnectivity: Designed for reliable wireless communication and improved signal performance.\nCompact Design: Suitable for integration into compact electronic and IoT devices.\nEasy Integration: Can be used with Wi-Fi modules, routers, gateways, and embedded wireless systems.\nApplications: IoT devices, smart home products, industrial gateways, networking equipment, embedded systems, and wireless communication applications.",
    "price": 280.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUn04ONCNO4SI_1PYVh7W3rBP-jNFKh6bplcPJW85EzQ&s=10",
    "specifications": {
      "partNumber": "TAEP121"
    }
  },
  {
    "id": "DEN2169",
    "name": "25 mm x 25 mm x 4 mm SMD Antenna",
    "slug": "25-mm-x-25-mm-x-4-mm-smd-antenna",
    "category": "RF Antenna",
    "shortDescription": "Embedded SMD Antenna Covering GPS and GLONASS bands.",
    "detailedDescription": "Antenna Type: Compact SMD (Surface Mount Device) antenna designed for wireless communication applications.\nDimensions: 25 mm x 25 mm x 4 mm, suitable for space-constrained PCB designs.\nPCB Mounting: Surface-mount configuration enables easy and reliable PCB integration.\nPerformance: Designed to provide stable RF performance with suitable impedance matching and PCB layout.\nApplications: Suitable for IoT devices, wireless modules, smart devices, industrial electronics, and embedded communication systems.",
    "price": 100.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPn6elQ5H84X11affrTuETtkZQAqA9XIaBoCa0mQD0xw&s",
    "specifications": {
      "partNumber": "CGMP165"
    }
  },
  {
    "id": "DEN2170",
    "name": "18mm x 18mm x 4.0mm Ceramic Patch SMD Antenna",
    "slug": "18mm-x-18mm-x-4-0mm-ceramic-patch-smd-antenna",
    "category": "RF Antenna",
    "shortDescription": "Embedded SMD Antenna Covering GPS and GLONASS bands.",
    "detailedDescription": "Compact ceramic patch SMD antenna designed for wireless/RF applications.\n18 x 18 x 4.0 mm form factor for space-constrained PCB designs.\nSurface-mount construction enables easy PCB integration.\nSuitable for stable RF performance with proper PCB layout and matching.\nIdeal for GNSS/GPS, IoT, tracking and wireless embedded applications.",
    "price": 110.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqWAxI2H3YEo5RXosWDj7u9X8Nvp56DPabBTFdTwrxSw&s",
    "specifications": {
      "partNumber": "CGMP166"
    }
  },
  {
    "id": "DEN2171",
    "name": "25mm x 25mm x 4.0mm Ceramic Patch Antenna through Hole",
    "slug": "25mm-x-25mm-x-4-0mm-ceramic-patch-antenna-through-hole",
    "category": "RF Antenna",
    "shortDescription": "GPS and GLONASS Ceramic Patch Antenna.",
    "detailedDescription": "Ceramic patch antenna designed for RF and wireless communication applications.\n25 x 25 x 4.0 mm compact mechanical form factor.\nThrough-hole mounting provides secure and robust PCB installation.\nSuitable for applications requiring reliable RF reception and transmission.\nIdeal for GNSS/GPS, tracking, IoT and wireless communication systems.",
    "price": 120.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8i_KnkVUg5XyQUDYhLEkxSpULV51pFh842S6RL5RhAw&s=10",
    "specifications": {
      "partNumber": "CGMP167"
    }
  },
  {
    "id": "DEN2172",
    "name": "25mm x 25mm x 8.0mm Single Feed Multiband Antenna",
    "slug": "25mm-x-25mm-x-8-0mm-single-feed-multiband-antenna",
    "category": "RF Antenna",
    "shortDescription": "Single feed Multi-band Patch Antenna.",
    "detailedDescription": "Compact single-feed multiband antenna for wireless communication applications.\n25 x 25 x 8.0 mm design suitable for compact electronic products.\nMultiband operation supports integration across multiple wireless technologies.\nSingle-feed configuration simplifies RF system integration.\nSuitable for IoT, wireless gateways, tracking devices and industrial electronics.",
    "price": 140.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTORiVSEn2Avb2hWOtAIyBoKtm-cRcdkbjOAELLqlVJeA&s=10",
    "specifications": {
      "partNumber": "CGMP168"
    }
  },
  {
    "id": "DEN2173",
    "name": "Puya NOR Flash Memory 16Mbit",
    "slug": "puya-nor-flash-memory-16mbit",
    "category": "Memory",
    "shortDescription": "Puya 16Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil.",
    "detailedDescription": "16 Mbit serial NOR Flash memory for non-volatile data storage.\nSuitable for firmware, boot code and configuration data storage.\nDesigned for easy integration with MCUs and embedded processors.\nCompact memory solution for space-constrained electronic designs.\nSuitable for industrial, automotive, IoT, HMI and consumer applications.",
    "price": 40.0,
    "stock": 100,
    "image": "https://www.mouser.com/images/newest-products/circuit-protection.jpg?nosprite",
    "specifications": {
      "partNumber": "PY25Q16HB-SUH-IR"
    }
  },
  {
    "id": "DEN2174",
    "name": "Puya NOR Flash Memory 32Mbit",
    "slug": "puya-nor-flash-memory-32mbit",
    "category": "Memory",
    "shortDescription": "Puya 32Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil.",
    "detailedDescription": "32 Mbit serial NOR Flash memory for embedded program and data storage.\nSuitable for firmware, application code and configuration parameters.\nProvides a convenient memory solution for MCU-based systems.\nCompact package supports space-efficient PCB designs.\nSuitable for HMI, IoT, industrial automation, automotive and consumer electronics.",
    "price": 50.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrlLj63ZQM8NP7l4XAHy39SfiEUGk4JHGusBKEYOaHA&s=10",
    "specifications": {
      "partNumber": "PY25Q32HB-SUH-IR"
    }
  },
  {
    "id": "DEN2175",
    "name": "Puya NOR Flash Memory 64Mbit",
    "slug": "puya-nor-flash-memory-64mbit",
    "category": "Memory",
    "shortDescription": "Puya 64Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil.",
    "detailedDescription": "64 Mbit serial NOR Flash memory for firmware and non-volatile data storage.\nSuitable for application code, boot memory and system configuration.\nDesigned for integration with microcontrollers and embedded processors.\nProvides higher storage capacity for advanced embedded applications.\nSuitable for HMI, industrial, automotive, IoT and consumer electronics.",
    "price": 80.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJveUWCgqrFN2J_4U4hqnsCLwW9OlP-28eblgu4sCeDQ&s",
    "specifications": {
      "partNumber": "PY25Q64HA-SUH-IR"
    }
  },
  {
    "id": "DEN2176",
    "name": "Puya NOR Flash Memory 128Mbit",
    "slug": "puya-nor-flash-memory-128mbit",
    "category": "Memory",
    "shortDescription": "Puya 128Mbit NOR Flash Memory - 3.3V/SOP-8/208Mil.",
    "detailedDescription": "128 Mbit serial NOR Flash memory for high-capacity embedded storage.\nSuitable for firmware, application code, graphics and configuration data.\nDesigned for integration with MCUs, processors and embedded systems.\nOffers a compact solution for applications requiring higher memory capacity.\nSuitable for HMI, industrial automation, automotive, IoT and smart devices.",
    "price": 198.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVMkEaNZCHXjhqBEAdpUrJA2xXgKbTizPzVyt6LRt8PA&s",
    "specifications": {
      "partNumber": "PY25Q128HA-SUH-IR"
    }
  },
  {
    "id": "DEN2177",
    "name": "Puya EEPROM Memory 16Kb",
    "slug": "puya-eeprom-memory-16kb",
    "category": "Memory",
    "shortDescription": "Puya 16Kb EEPROM Memory - 3.3V.",
    "detailedDescription": "16 Kbit I2C EEPROM for non-volatile parameter and data storage.\nSuitable for configuration settings, calibration data and device identification.\nSerial I2C interface enables simple integration with microcontrollers.\nCompact memory solution for embedded electronic designs.\nSuitable for industrial controls, metering, automotive, IoT and consumer applications.",
    "price": 40.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsZzdQ9LKeU3cxIdKbB6FkMpn-ZX9Z3mJEBrVz-YLx4A&s",
    "specifications": {
      "partNumber": "P24C16C-SSH-MIR"
    }
  },
  {
    "id": "DEN2178",
    "name": "Puya EEPROM Memory 32Kb",
    "slug": "puya-eeprom-memory-32kb",
    "category": "Memory",
    "shortDescription": "Puya 32Kb EEPROM Memory - 3.3V.",
    "detailedDescription": "32 Kbit I2C EEPROM designed for reliable non-volatile data storage.\nSuitable for calibration values, configuration parameters and device information.\nProvides simple I2C communication with MCUs and embedded controllers.\nCompact package supports space-efficient PCB designs.\nSuitable for industrial, automotive, metering, IoT and instrumentation applications.",
    "price": 38.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRl0cGupPy5ZlGFZhHhJzkYvz4ooEy2zdPNX80wR5xA9Q&s=10",
    "specifications": {
      "partNumber": "P24C32C-SSH-MIR"
    }
  },
  {
    "id": "DEN2179",
    "name": "Puya EEPROM Memory 64Kb",
    "slug": "puya-eeprom-memory-64kb",
    "category": "Memory",
    "shortDescription": "Puya 64Kb EEPROM Memory - 3.3V.",
    "detailedDescription": "64 Kbit I2C EEPROM for persistent configuration and data storage.\nSuitable for storing calibration data, system parameters and device information.\nI2C serial interface enables straightforward MCU integration.\nHigher memory capacity supports applications with increased data-storage requirements.\nSuitable for industrial automation, automotive, smart meters, IoT and embedded systems.",
    "price": 42.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIXQrDk_Rn_atpugf5N0QSJQLjV-E1_ECTpDO0YbB05w&s=10",
    "specifications": {
      "partNumber": "P24C64C-SSH-MIR"
    }
  },
  {
    "id": "DEN2180",
    "name": "1 GB NAND Flash Memory 1.8V / 3.3V",
    "slug": "1-gb-nand-flash-memory-1-8v---3-3v",
    "category": "Memory",
    "shortDescription": "1GB NAND Flash Memory designed for embedded and storage applications.",
    "detailedDescription": "1GB NAND Flash Memory designed for embedded and storage applications.\nSupports 1.8V / 3.3V power supply options for flexible system integration.\nProvides reliable non-volatile data storage with fast read/write performance.\nSuitable for industrial, automotive, IoT, consumer electronics, and embedded systems.\nIdeal for MCU/MPU-based designs, HMI displays, gateways, controllers, and data-logging applications.",
    "price": 400.0,
    "stock": 100,
    "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQUAsFF2QmycUJwHAaSuJMGdIFA_YAoCEQud5usatvfpeB2JGFJpDyZG3LhYhI2J-rsWVWXYQdycMu3iCI9pLzKAYDMvsM",
    "specifications": {
      "partNumber": "GSS01GSAX1 (3.3V)"
    }
  }
];