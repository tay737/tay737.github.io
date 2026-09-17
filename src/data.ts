import { Project, Interest, SystemProfile, SetupProfile } from './types';

export const profile = {
  name: "tay",
  role: "T-Level Cybersecurity student.",
  focus: "Curious and passionate.",
  location: "England",
  email: "tayyab@outlook.jp",
  githubUsername: "tay737",
  githubUrl: "https://github.com/tay737",
  linkedinUrl: "https://linkedin.com/in/tay737",
  about: {
    intro: "It all began with a barely-functioning Dell Inspiron E1750. Onwards from the age of 4, my fascination for computers has only grown - leading to an unhealthy need to figure out how and why things work the way they do, and how they can be cracked. No system can ever be truly safe; the only way to patch a vulnerability is exposing it first.",
    personality: "Currently enrolled in T-Level Cybersecurity (Digital Support & Security). Picking up and practicing skills independently through CTFs/labs, experimentation and attacking my own home network to see what vulnerabilites I can expose - and patch.",
  }
};

export const interests: Interest[] = [
  {
    category: "Media",
    items: [
      { title: "Mr Robot", description: "The pinnacle of cinematography in modern-day entertainment. Amazing show, with an amazing plot, and amazing actors to pull it all off."},
      { title: "Neon Genesis Evangelion", description: "Might be the best anime in existence. (sorry)"},
      { title: "Boy's Abyss", description: "Liked it so much I ended up buying a copy of all the volumes."},
      { title: "No Longer Human", description: "Timeless novel from 1948. Heavy content, but a great read."},
    ]
  },
  {
    category: "Games",
    items: [
      { title: "Rainbow Six Siege", description: "Top 2955 in Y10S2." },
      { title: "Overwatch", description: "DPS Hitscan main." },
      { title: "KovaaK's", description: "Currenty Voltaic S5 Jade with a few Master scores." },
      { title: "Life is Strange", description: "1 and Before the Storm – all time favourites." }
    ]
  },
  {
    category: "Hobbies",
    items: [
      { title: "Gaming" },
      { title: "Video Editing" },
      { title: "Photo Editing" },
      { title: "Graphics Design" },
      { title: "Music" },
      { title: "Reading" },
      { title: "Creative Writing" }
    ]
  }
];

// ASCII Art Strings with Color Markers
const macOSAscii = `$1                      ..'
                 ,xNMM.
               .OMMMMo
               lMM"
     .;loddo:.  .olloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
$2.KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
$3;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
$4.MMMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.
$5'XMMMMMMMMMMMMMMMMMMMMMMMMMMk
  'XMMMMMMMMMMMMMMMMMMMMMMMMK.
    $1kMMMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       "cooc*"    "*coo'"`;

const windowsAscii = `$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////
$1/////////////////  $2/////////////////

$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////
$3/////////////////  $4/////////////////`;

const parrotAscii = `$1  \`:oho/-\`
\`mMMMMMMMMMMMNmmdhy-
 dMMMMMMMMMMMMMMMMMMs\`
 +MMsohNMMMMMMMMMMMMMm/
 .My   .+dMMMMMMMMMMMMMh.
$2  +       :NMMMMMMMMMMMMNo
           \`yMMMMMMMMMMMMMm:
             /NMMMMMMMMMMMMMy\`
               .hMMMMMMMMMMMMMN+
$3                   \`\`-NMMMMMMMMMd-
                      /MMMMMMMMMMMs\`
                       mMMMMMMMsyNMN/
                       +MMMMMMMo  :sNh.
$4                       \`NMMMMMMm     -o/
                        oMMMMMMM.
                        \`NMMMMMM+
                         +MMd/NMh
$5                          mMm -mN\`
                          /MM  \`h:
                           dM\`   .
                           :M-
                            d:
                            -+`;

export const systems: SystemProfile[] = [
  {
    id: "macbook",
    displayName: "MacBook",
    role: "Productivity; handling intense workloads when I'm on the go.",
    terminal: {
      username: "macbook",
      hostname: "737",
      workingDirectory: "~"
    },
    ascii: macOSAscii,
    flag: "transgender",
    systemInfo: [
      { label: "OS", value: "macOS 26.6.2 (25G83) arm64" },
      { label: "Host", value: "Mac15,7" },
      { label: "Kernel", value: "25.6.0" },
      { label: "Uptime", value: "6 days, 12 hours, 53 mins" },
      { label: "Packages", value: "2 (npm), 59 (brew)" },
      { label: "Shell", value: "zsh 5.9" },
      { label: "Resolution", value: "1728x1117 @2x @ 120Hz" },
      { label: "DE", value: "Aqua" },
      { label: "WM", value: "Quartz Compositor" },
      { label: "WM Theme", value: "Blue (Light)" },
      { label: "Terminal", value: "Apple Terminal" },
      { label: "CPU", value: "Apple M3 Pro (12)" },
      { label: "GPU", value: "Apple M3 Pro (18)" },
      { label: "Network", value: "en0: Wi-Fi (802.11n) @ 144 Mbps" }
    ]
  },
  {
    id: "cybersecurity-vm",
    displayName: "VM",
    role: "CTFs, offensive security, Linux.",
    terminal: {
      username: "vm",
      hostname: "737",
      workingDirectory: "~"
    },
    ascii: parrotAscii,
    flag: "transgender",
    systemInfo: [
      { label: "OS", value: "Parrot Security 7.3 (echo) aarch64" },
      { label: "Host", value: "QEMU Virtual Machine (virt-10.0)" },
      { label: "Kernel", value: "Linux 7.0.13+parrot7-arm64" },
      { label: "Uptime", value: "1 min" },
      { label: "Packages", value: "3904 (dpkg)" },
      { label: "Shell", value: "bash 5.2.37" },
      { label: "Display (QEMU Monitor)", value: "3456x1938 @ 75 Hz (as 1536x861) in 15\"" },
      { label: "DE", value: "KDE Plasma 6.3.6" },
      { label: "WM", value: "KWin (Wayland)" },
      { label: "WM Theme", value: "Silvery-Blur-Dark-Aurorae-6" },
      { label: "Theme", value: "Breeze (SimplyBlack) [Qt], Silvery-GTK [GTK2/3/4]" },
      { label: "Icons", value: "YAMIS [Qt], YAMIS [GTK2/3/4]" },
      { label: "Font", value: "Noto Sans (10pt) [Qt], Noto Sans (10pt) [GTK2/3/4]" },
      { label: "Cursor", value: "volantes (24px)" },
      { label: "Terminal", value: "konsole 25.4.2" },
      { label: "Terminal Font", value: "Hack (8pt)" },
      { label: "CPU", value: "Virtualized Apple Silicon (8)" },
      { label: "GPU", value: "RedHat Virtio 1.0 GPU" },
      { label: "Memory", value: "2.11 GiB / 9.69 GiB (22%)" },
      { label: "Swap", value: "Disabled" },
      { label: "Disk (/)", value: "13.93 GiB / 63.50 GiB (22%) - btrfs" },
      { label: "Local IP (enp0s1)", value: "192.168.X.XX/XX" },
      { label: "Locale", value: "C.UTF-8" }
    ]
  }
];

export const setups: SetupProfile[] = [
  {
    id: "pc",
    name: "PC",
    operatingSystem: "Windows 11",
    specs: {
      "CPU": "AMD Ryzen 9 9950X3D",
      "GPU": "NVIDIA GeForce RTX 3080",
      "RAM": "96GB Corsair Vengeance DDR5-6600",
      "Storage": "2TB M.2 NVMe SSD",
      "Motherboard": "ASUS ROG Crosshair X870-E",
      "PSU": "Corsair RM850x",
      "Case": "ROG Hyperion GR701"
    },
    peripherals: [
      { type: "Keyboard", name: "Steelseries Apex Pro TKL", description: "OmniPoint 2.0" },
      { type: "Mouse", name: "Logitech G Pro X Superlight 2", description: "Tiger Ice V2" },
      { type: "Monitor", name: "BenQ Zowie XL2566X+", description: "1080p, 400Hz, TN" },
      { type: "Audio", name: "Astro A50 X" },
    ]
  },
  {
    id: "laptop",
    name: "MacBook",
    operatingSystem: "macOS",
    specs: {
      "Model": "MacBook Pro (16-inch, Nov 2023)",
      "Chip": "Apple M3 Pro",
      "RAM": "18GB",
      "Storage": "512GB SSD",
      "Display": "Liquid Retina XDR"
    },
    peripherals: [
      { type: "Audio", name: "AirPods Pro (2nd-generation)" },
    ]
  },
  {
    id: "vm",
    name: "VM",
    operatingSystem: "Parrot OS",
    specs: {
      "Hypervisor": "UTM",
      "CPU Allocation": "8 Cores",
      "RAM Allocation": "10GB",
      "Storage": "100GB"
    }
  }
];
