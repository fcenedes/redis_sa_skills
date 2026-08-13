# Source Hierarchy Reference

Detailed source ranking, stack detection, citation format, and the UNVERIFIED
flagging protocol for source-driven development.

## Stack Detection from Dependency Files

Read the following files to determine the project's ecosystem and pinned
versions. Check all that exist -- polyglot projects use multiple ecosystems.

| File | Ecosystem | Version field |
|---|---|---|
| `package.json` | Node.js / TypeScript | `dependencies`, `devDependencies` |
| `package-lock.json` / `yarn.lock` / `pnpm-lock.yaml` | Node.js (resolved) | Exact resolved versions |
| `pom.xml` | Java (Maven) | `<version>` inside `<dependency>` |
| `build.gradle` / `build.gradle.kts` | Java (Gradle) | Version string in dependency declaration |
| `pyproject.toml` / `requirements.txt` / `setup.cfg` | Python | Version specifier (`==`, `>=`, `~=`) |
| `go.mod` | Go | `require` block with `vX.Y.Z` |
| `Cargo.toml` | Rust | `[dependencies]` version field |
| `Gemfile` / `Gemfile.lock` | Ruby | Version constraint / resolved version |

**Rule**: Always prefer the lock file's resolved version over the manifest's
range specifier. The lock file is what actually runs in production.

## Source Ranking Table

Rank 1 sources are mandatory. Rank 2-3 are supplementary. Rank 4+ are
prohibited as primary sources.

### Rank 1 -- Official Documentation (REQUIRED)

The version-specific reference published by the library or framework maintainers.

| Ecosystem | Source pattern | Example |
|---|---|---|
| Node.js | Official docs site, versioned | `https://nodejs.org/docs/v20.11.0/api/` |
| Express | Express API reference | `https://expressjs.com/en/5x/api.html` |
| React | React docs | `https://react.dev/reference/react` |
| Java (Spring) | Spring reference docs, versioned | `https://docs.spring.io/spring-boot/docs/3.2.0/reference/` |
| Java (Jedis) | Jedis Javadoc | `https://www.javadoc.io/doc/redis.clients/jedis/5.1.0/` |
| Java (Lettuce) | Lettuce reference | `https://lettuce.io/core/release/reference/` |
| Python | Library readthedocs, versioned | `https://redis-py.readthedocs.io/en/v5.0.0/` |
| Python (Django) | Django docs, versioned | `https://docs.djangoproject.com/5.0/` |
| Python (FastAPI) | FastAPI docs | `https://fastapi.tiangolo.com/` |
| Go | pkg.go.dev | `https://pkg.go.dev/github.com/redis/go-redis/v9` |
| Rust | docs.rs | `https://docs.rs/redis/0.25.0/redis/` |
| Ruby | RubyDoc / gem docs | `https://rubydoc.info/gems/redis/5.1.0` |

### Rank 2 -- Official Blog Posts, Changelogs, Migration Guides

Use when Rank 1 docs do not yet cover a new feature or breaking change.

- Release notes on the project's GitHub releases page
- Official blog posts by the maintainer organization
- Migration guides published alongside a major version release
- CHANGELOGs in the project's repository

### Rank 3 -- Web Standards References

Use for browser APIs, HTTP semantics, and protocol-level behavior.

- MDN Web Docs (`https://developer.mozilla.org/`)
- RFCs (`https://www.rfc-editor.org/`)
- W3C specifications
- WHATWG standards (`https://html.spec.whatwg.org/`)

### Rank 4 -- PROHIBITED as Primary Source

Do not use any of the following as the basis for an implementation decision.
They may contain outdated, incorrect, or version-mismatched information.

- Stack Overflow answers
- Medium / Dev.to / Hashnode blog posts
- Tutorial sites (DigitalOcean tutorials, Baeldung, Real Python articles)
- AI-generated documentation or summaries
- Training-data recall without a fetched backing source
- YouTube transcripts
- Forum posts (Reddit, Discourse, GitHub Discussions)

## Redis Client Library Official Documentation URLs

Canonical entry points for Redis client documentation. Always append the
version path segment matching the project's pinned version.

| Client | Documentation URL |
|---|---|
| redis-py | `https://redis-py.readthedocs.io/en/stable/` |
| redis (Node.js) | `https://github.com/redis/node-redis` + `https://redis.io/docs/latest/develop/clients/nodejs/` |
| Jedis | `https://redis.io/docs/latest/develop/clients/jedis/` |
| Lettuce | `https://redis.io/docs/latest/develop/clients/lettuce/` |
| go-redis | `https://redis.io/docs/latest/develop/clients/go/` |
| redis-rs | `https://docs.rs/redis/latest/redis/` |
| Redis OM Python | `https://redis.io/docs/latest/integrate/redisom-for-python/` |
| Redis OM Spring | `https://redis.io/docs/latest/integrate/redisom-for-java/` |
| Redis OM Node | `https://redis.io/docs/latest/integrate/redisom-for-node-js/` |
| Redis commands | `https://redis.io/docs/latest/commands/` |

## UNVERIFIED Flagging Protocol

When a framework-specific pattern cannot be verified against a Rank 1 or Rank 2
source, flag it explicitly.

### When to flag

- The official docs site is unreachable or returns an error.
- The pinned version has no documentation (pre-release, yanked, too old).
- The specific API or behavior is not mentioned in the fetched docs.
- The docs are ambiguous and do not clearly confirm the usage pattern.

### How to flag

Insert an inline marker immediately before or after the unverified code:

```
<!-- UNVERIFIED: No official documentation found for `client.ft().aggregate()`
     in redis-py v4.6.0. Pattern based on training-data recall.
     Risk: API may have changed or may not exist in this version. -->
```

For code comments:

```python
# UNVERIFIED: redis-py v4.6.0 -- ft().aggregate() not found in official docs.
# Verify at https://redis-py.readthedocs.io/en/v4.6.0/ before production use.
result = client.ft("idx").aggregate(request)
```

### What to include in the flag

1. The word **UNVERIFIED** in all caps.
2. The specific library and version.
3. The API call or pattern that could not be verified.
4. Why verification failed (docs unreachable, API not mentioned, version mismatch).
5. A suggested verification URL for the user.

## Citation Format

Attach citations as code comments or markdown references depending on context.

### In code output

```python
# Source: https://redis-py.readthedocs.io/en/v5.0.0/commands.html#redis.commands.json
import redis
r = redis.Redis()
r.json().set("key", "$", {"name": "doc"})
```

### In markdown / explanation output

```markdown
Use `JSON.SET` to store a JSON document at a key [^1].

[^1]: https://redis.io/docs/latest/commands/json.set/
```

### In pull request descriptions

```markdown
## Sources consulted
- redis-py v5.0.0 JSON commands: https://redis-py.readthedocs.io/en/v5.0.0/commands.html#redis.commands.json
- Redis JSON.SET command reference: https://redis.io/docs/latest/commands/json.set/
```

### Multiple citations for one pattern

When a pattern requires combining information from multiple sources, cite all of
them and note what each source contributed:

```python
# Source (connection config): https://redis-py.readthedocs.io/en/v5.0.0/connections.html
# Source (TLS parameters): https://redis.io/docs/latest/operate/oss_and_stack/connect/clients/
r = redis.Redis(host="cache.example.com", port=6380, ssl=True, ssl_cert_reqs="required")
```
