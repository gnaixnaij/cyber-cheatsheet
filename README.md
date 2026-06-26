# Cyber Cheatsheet ⚡

Curated collection of **120+** pentesting and cybersecurity commands across **13 sections** — built for CTFs, penetration tests, and security assessments.

## Live Site

https://gnaixnaij.github.io/cyber-cheatsheet/

## Sections

| # | Section | Tools |
|---|---------|-------|
| 1 | Reconnaissance | nmap, whois, dnsrecon, dig |
| 2 | Scanning & Enumeration | gobuster, ffuf, nikto, wpscan, whatweb |
| 3 | Web Exploitation | sqlmap, curl |
| 4 | Exploitation Frameworks | msfconsole, msfvenom, searchsploit |
| 5 | Password Cracking | hashcat, john, hydra |
| 6 | Reverse Shells & Listeners | netcat, bash, python, php, socat |
| 7 | Lateral Movement | impacket, evil-winrm, smbclient, ssh |
| 8 | **OSINT** | theHarvester, sherlock, shodan, waybackurls, holehe |
| 9 | **Forensics** | volatility, autopsy, foremost, bulk_extractor, exiftool |
| 10 | **Cloud & AD** | aws, s3scanner, BloodHound, kerbrute, impacket |
| 11 | **Privilege Escalation** | sudo, find, linpeas, winpeas, accesschk |
| 12 | Cryptography & Encoding | openssl, base64, xxd |
| 13 | Misc Utilities | steghide, binwalk, strings |

## Features

- Dark/light theme toggle (persisted in localStorage)
- Live search with section filtering
- Difficulty badges (easy/medium/hard) on commands
- Copy-to-clipboard on every command
- Keyboard-navigable table of contents
- Fully responsive (mobile + desktop)

## Tech

- HTML5 · CSS3 · JavaScript (vanilla, no dependencies)
- CSS custom properties for theming
- JetBrains Mono + Inter fonts
- Hosted on GitHub Pages

## Usage

Open the [live site](https://gnaixnaij.github.io/cyber-cheatsheet/) or clone and open `index.html` locally. No build step needed.

```bash
git clone git@github.com:gnaixnaij/cyber-cheatsheet.git
cd cyber-cheatsheet
open index.html
```
