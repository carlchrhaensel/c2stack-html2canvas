# Security Policy

## Supported Versions

We actively maintain the latest major version of html2canvas. Security updates are provided for:

| Version | Supported          |
| ------- | ------------------ |
| 1.4.x   | :white_check_mark: |
| < 1.4   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in html2canvas, please follow responsible disclosure practices:

### Where to Report

**Please DO NOT open a public issue for security vulnerabilities.**

Instead, report security issues via:
- Email: [Insert maintainer email]
- GitHub Security Advisory: https://github.com/niklasvh/html2canvas/security/advisories/new

### What to Include

When reporting a vulnerability, please include:

1. **Description**: A clear description of the vulnerability
2. **Impact**: What can be done by exploiting this vulnerability
3. **Reproduction Steps**: Detailed steps to reproduce the issue
4. **Proof of Concept**: If possible, include a minimal example demonstrating the issue
5. **Affected Versions**: Which versions are affected
6. **Suggested Fix**: If you have ideas on how to fix it (optional)

### What to Expect

- **Acknowledgment**: We'll acknowledge receipt within 48 hours
- **Initial Assessment**: We'll provide an initial assessment within 5 business days
- **Updates**: We'll keep you informed about our progress
- **Credit**: We'll credit you in the security advisory (unless you prefer to remain anonymous)

### Security Update Process

1. We'll investigate and confirm the vulnerability
2. We'll develop and test a fix
3. We'll prepare a security advisory
4. We'll release a patch version
5. We'll publish the security advisory after users have had time to update

## Security Best Practices

When using html2canvas in your application:

### Content Security Policy

html2canvas may need access to external resources. Configure your CSP appropriately:

```http
Content-Security-Policy: img-src 'self' data: https:;
```

### Cross-Origin Resources

Be aware that html2canvas:
- Cannot access cross-origin images without CORS headers
- May require a proxy for external resources
- Respects browser same-origin policy

### User-Generated Content

If rendering user-generated HTML:
- Sanitize all user input before rendering
- Be aware of potential XSS vectors
- Consider using a sandboxed environment
- Validate and limit CSS that can be used

### Data URIs

html2canvas generates data URIs which can be large:
- Set appropriate size limits
- Be aware of memory usage with large canvases
- Consider streaming or chunked processing for large documents

## Known Limitations

### Not for Server-Side Rendering

html2canvas is a client-side library and should not be used for server-side rendering of untrusted content, as it:
- Executes in the browser context
- Has access to the DOM
- Can load external resources

### Browser Security Features

html2canvas respects and is subject to:
- Same-origin policy
- CORS restrictions
- Content Security Policy
- Browser sandboxing

## Dependencies

We regularly update our dependencies to address known vulnerabilities. You can check our dependency status:

- Use `bun audit` to check for known vulnerabilities
- Review our [dependabot alerts](https://github.com/niklasvh/html2canvas/security/dependabot)

## Security Updates

Security updates will be released as patch versions and announced via:
- GitHub Security Advisories
- Release notes
- NPM security advisories

Subscribe to repository notifications to stay informed about security updates.

## Questions?

For general security questions (not vulnerability reports), please:
- Open a [discussion](https://github.com/niklasvh/html2canvas/discussions)
- Tag it appropriately for security-related questions

Thank you for helping keep html2canvas and its users safe!
