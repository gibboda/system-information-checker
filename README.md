# System Information Checker Dashboard

A lightweight web-based dashboard that detects and displays browser and operating system information with visual indicators for system compatibility.

## Features

- **Browser Detection**: Identifies major browsers including Chrome, Firefox, Safari, Edge, and custom browsers (CLDB, CMAC, GuardianBrowser)
- **OS Detection**: Detects Windows and macOS versions with detailed version information
- **Visual Indicators**: Color-coded alerts (success/warning/error) based on system compatibility
- **Security-First**: Implements Content Security Policy and input sanitization to prevent XSS attacks
- **Responsive Design**: Clean, modern interface with browser and OS icons

## Supported Browsers

- Google Chrome (v128+)
- Mozilla Firefox (v135+)
- Safari (v18.0+)
- Microsoft Edge (v128+)
- CLDB (v2.1.3.00+)
- CMAC (v2.1.3.00+)
- GuardianBrowser (v1.91.0+)

## Supported Operating Systems

- Windows NT 11.0, 10.0, 6.3, 6.1
- macOS 15.x, 14.x, 13.x, 12.x, 11.x, 10.15.x, 10.14.x, 10.13.x, 10.12.x, 10.11.x, 10.10.x

## Installation

1. Clone the repository:
```bash
git clone https://github.com/gibboda/system-information-checker.git
cd system-information-checker
```

2. Open `SICD.html` in a web browser, or serve it using a local web server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server
```

3. Navigate to `http://localhost:8000/SICD.html`

## Project Structure

```
system-information-checker/
├── SICD.html           # Main HTML page
├── assets/
│   ├── SICD.css        # Stylesheet
│   └── SICD.js         # JavaScript detection logic
├── images/
│   └── operating_systems/  # OS icon assets
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Usage

Simply open the dashboard in your web browser. The page will automatically:
1. Detect your browser type and version
2. Detect your operating system and version
3. Display color-coded alerts indicating system status:
   - **Green (Success)**: System meets recommended requirements
   - **Yellow (Warning)**: System partially meets requirements
   - **Red (Error)**: System does not meet requirements

## Security Features

- Content Security Policy (CSP) headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- Input sanitization for XSS prevention
- No-referrer policy

## Development

Originally created on October 18, 2007  
Recreated and revised on February 14, 2025  
Last updated on February 15, 2025

**Author**: Dona Gibbons

## Technologies

- HTML5
- CSS3
- JavaScript (ES5)
- jQuery 3.7.1

## Browser Compatibility

This dashboard works in all modern browsers. For accurate detection, ensure JavaScript is enabled.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

## Versioning

- The project stores the current semantic version in `version.txt` at the repository root.
- A GitHub Actions workflow (`.github/workflows/bump-version.yml`) runs on every push and will automatically bump the patch version (e.g. `0.1.0` → `0.1.1`), commit the change, and push it back to the repository.
- The bump script used by the workflow is located at `.github/scripts/bump_version.sh`.

Notes:

- The workflow avoids recursive bumps by skipping execution when the push actor is the `github-actions[bot]`.
- If you want the same behavior locally, run the bump script manually:

```bash
# Increment the patch version locally
bash .github/scripts/bump_version.sh
```
