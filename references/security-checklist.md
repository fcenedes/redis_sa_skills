# Security Checklist

Pre-commit and design-time security checks covering OWASP Top 10 and Redis-specific hardening.

## Input Validation

- [ ] All external input is validated at the boundary (type, length, range, format)
- [ ] Allowlists are preferred over denylists for input filtering
- [ ] File uploads are validated by content type, not just extension
- [ ] Path traversal is prevented: no user input in file paths without sanitization
- [ ] Deserialization of untrusted data uses safe parsers (no pickle, no eval, no YAML unsafe load)
- [ ] GraphQL/API queries have depth and complexity limits

## Authentication and Authorization

- [ ] Authentication uses established libraries, not hand-rolled crypto
- [ ] Passwords are hashed with bcrypt, scrypt, or argon2 (never MD5/SHA1 alone)
- [ ] Multi-factor authentication is available for privileged operations
- [ ] Session tokens are rotated on login and privilege escalation
- [ ] Authorization checks happen server-side on every request, not just in the UI
- [ ] API keys and tokens have expiration dates and scoped permissions
- [ ] Failed login attempts are rate-limited and logged

## Secrets Management

- [ ] No secrets in source code, config files, or environment variable defaults
- [ ] Secrets are loaded from a vault (HashiCorp Vault, AWS Secrets Manager, etc.)
- [ ] `.env` files are in `.gitignore` and never committed
- [ ] CI/CD secrets use the platform's secret store, not plain-text variables
- [ ] Secrets are rotated on a documented schedule
- [ ] Leaked secrets are revoked immediately, not just rotated

## OWASP Top 10 Coverage

### Injection (A03)

- [ ] SQL uses parameterized queries or ORM-generated queries exclusively
- [ ] OS commands are never constructed from user input; use library APIs instead
- [ ] LDAP, XPath, and template injections are mitigated by escaping or parameterization

### Broken Access Control (A01)

- [ ] Default-deny: all endpoints require authentication unless explicitly public
- [ ] CORS is configured to the narrowest necessary origin list
- [ ] Directory listing is disabled on web servers
- [ ] IDOR is prevented by checking ownership on every resource access

### Security Misconfiguration (A05)

- [ ] Debug mode is off in production
- [ ] Default credentials are changed or removed
- [ ] HTTP security headers are set: CSP, HSTS, X-Content-Type-Options, X-Frame-Options
- [ ] Error messages do not leak stack traces, SQL, or internal paths

### Vulnerable Components (A06)

- [ ] Dependencies are pinned to specific versions
- [ ] Dependency vulnerability scanning runs in CI (Dependabot, Snyk, Trivy, etc.)
- [ ] Transitive dependencies are reviewed for known CVEs before release
- [ ] End-of-life libraries have a migration plan with a deadline

### Cryptographic Failures (A02)

- [ ] Data in transit uses TLS 1.2+ with strong cipher suites
- [ ] Data at rest is encrypted for PII and sensitive fields
- [ ] Encryption keys are managed separately from encrypted data
- [ ] No custom cryptography implementations

## Logging and Monitoring

- [ ] Authentication events (success and failure) are logged
- [ ] Authorization failures are logged with request context
- [ ] Logs never contain secrets, tokens, passwords, or full credit card numbers
- [ ] PII in logs is masked or pseudonymized
- [ ] Log integrity is protected (append-only, centralized, tamper-evident)
- [ ] Alerting exists for anomalous patterns (brute force, privilege escalation)

## Redis-Specific Security

### Network and Access Control

- [ ] Redis is not exposed to the public internet (bind to internal interfaces only)
- [ ] TLS is enabled for all Redis connections in production
- [ ] TLS certificates are validated (not `--tls-rejectUnauthorized false`)
- [ ] Redis ACLs are configured: one user per application, least privilege
- [ ] The `default` user is disabled or restricted to read-only
- [ ] ACL rules use key patterns to restrict access per application

### Dangerous Commands

- [ ] `KEYS *` is never used in production code (use `SCAN` instead)
- [ ] `FLUSHDB`/`FLUSHALL` are disabled via ACL or `rename-command` in production
- [ ] `DEBUG`, `CONFIG SET`, and `SHUTDOWN` are restricted to admin ACL users
- [ ] `MONITOR` is never left running in production (use sampling or `SLOWLOG`)
- [ ] `EVAL`/`EVALSHA` Lua scripts do not concatenate user input into script bodies

### Lua Script Safety

- [ ] Lua scripts are loaded from files, not constructed dynamically
- [ ] User-provided values are passed as KEYS/ARGV, never interpolated into script text
- [ ] Scripts have bounded execution time (no unbounded loops)
- [ ] `redis.call` errors are handled, not silently swallowed

### Credential Management

- [ ] Redis passwords are at least 32 characters, randomly generated
- [ ] Passwords are stored in a secrets manager, not in config files
- [ ] Redis Cloud or Sentinel passwords use the provider's secret rotation
- [ ] Connection strings with embedded passwords are never logged
- [ ] Redis URI format (`redis://user:pass@host`) is never stored in plain text

### Data Protection

- [ ] Sensitive data stored in Redis has appropriate TTLs (no indefinite PII caching)
- [ ] PII in Redis is encrypted at the application layer if Redis encryption at rest is not enabled
- [ ] Cache invalidation is triggered on data deletion requests (GDPR right to erasure)
- [ ] RDB/AOF persistence files are stored on encrypted volumes with restricted access
