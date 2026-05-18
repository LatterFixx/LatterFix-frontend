# 📋 Stellar Task Manager - Decentralized Work Management

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust](https://img.shields.io/badge/Rust-1.84%2B-orange.svg)](https://www.rust-lang.org)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue.svg)](https://stellar.org)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Issues](https://img.shields.io/github/issues/yourusername/stellar-task-manager)](https://github.com/yourusername/stellar-task-manager/issues)

<!-- <div align="center">
  <img src="https://stellar.org/images/og-image.jpg" alt="Stellar Logo" width="200"/>
  <h3>A Decentralized Task Management System on the Stellar Network</h3>
  <p><i>Connect task creators with contributors through smart contracts</i></p>
</div> -->

---

## 🌟 Overview

The **Stellar Task Manager** is a Soroban smart contract that enables decentralized task management on the Stellar blockchain. It allows users to create tasks, assign them to contributors, manage workflow states, and automatically release payments with platform fees.

### 🎯 Perfect for Open Source Contributors!

This project is specifically designed with **10 distinct issues** that are perfect for developers learning Rust and Soroban development. Each issue is self-contained, well-documented, and comes with clear acceptance criteria.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📝 **Task Creation** | Create tasks with title, description, reward, deadline, and tags |
| 👥 **Assignment System** | Admin can assign tasks to qualified contributors |
| 🔄 **Workflow States** | Tasks flow through Open → Assigned → InProgress → Completed → Verified |
| 💰 **Automated Payments** | Platform fees automatically deducted, rewards sent to contributors |
| 👤 **User Profiles** | Build reputation through completed tasks |
| 🛡️ **Emergency Controls** | Pause contract in case of emergencies |
| 📊 **Pagination** | Browse tasks efficiently with pagination |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Task Manager Contract                     │
├─────────────────────────────────────────────────────────────┤
│                        Storage Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │    Tasks     │  │    Users     │  │    Rewards       │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Business Logic                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Task Flow   │  │    Auth      │  │  Payment Calc    │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                       Soroban SDK                           │
└─────────────────────────────────────────────────────────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Stellar Network   │
                    └─────────────────────┘
```

---

## 🚀 Quick Start for Contributors

### Prerequisites

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add WebAssembly target
rustup target add wasm32-unknown-unknown

# Install Stellar CLI
curl -fsSL https://github.com/stellar/stellar-cli/raw/main/install.sh | sh
```

### Clone and Build

```bash
# Clone the repository
git clone https://github.com/yourusername/stellar-task-manager.git
cd stellar-task-manager

# Build the contract
cargo build --target wasm32-unknown-unknown --release

# Run tests
cargo test
```

### Project Structure

```
stellar-task-manager/
├── contracts/
│   └── task_manager/
│       ├── Cargo.toml          # Contract dependencies
│       └── src/
│           ├── lib.rs           # Main contract code
│           └── test.rs          # Unit tests
├── Cargo.toml                    # Workspace configuration
├── README.md                      # This file
└── CONTRIBUTING.md                # Contribution guidelines
```

---

## 📚 Smart Contract Overview

### Core Data Structures

```rust
// Task structure
pub struct Task {
    pub id: u32,
    pub title: String,
    pub description: String,
    pub reward: i128,
    pub assignee: Option<Address>,
    pub status: TaskStatus,
    pub created_by: Address,
    pub created_at: u64,
    pub deadline: Option<u64>,
    pub tags: Vec<String>,
}

// User profile
pub struct UserProfile {
    pub address: Address,
    pub username: Option<String>,
    pub reputation: u32,
    pub completed_tasks: u32,
    pub joined_at: u64,
    pub bio: Option<String>,
}

// Task status enum
pub enum TaskStatus {
    Open,
    Assigned,
    InProgress,
    Completed,
    Verified,
    Cancelled,
}
```

### Workflow Diagram

```
┌─────────┐     ┌──────────┐     ┌────────────┐     ┌───────────┐     ┌──────────┐
│  Open   │────▶│ Assigned │────▶│ InProgress │────▶│ Completed │────▶│ Verified │
└─────────┘     └──────────┘     └────────────┘     └───────────┘     └──────────┘
      │               │                  │                  │                │
      └───────────────┴──────────────────┴──────────────────┴────────────────┘
                                      │
                                      ▼
                                ┌───────────┐
                                │ Cancelled │
                                └───────────┘
```

---

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
cargo test

# Run with output
cargo test -- --nocapture

# Run specific test
cargo test test_initialize
```

---


See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 🛠️ Development Tips

### Useful Commands

```bash
# Format code
cargo fmt

# Lint code
cargo clippy

# Build optimized WASM
cargo build --target wasm32-unknown-unknown --release

# Check contract size
ls -lh target/wasm32-unknown-unknown/release/*.wasm
```

### Common Patterns

```rust
// Storage pattern
pub fn get_data(env: &Env, key: DataKey) -> Option<Value> {
    env.storage().instance().get(&key)
}

// Authorization pattern
pub fn admin_only(env: &Env, caller: Address) {
    let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
    if admin != caller {
        panic!("Not authorized");
    }
    caller.require_auth();
}

// Error handling pattern
pub fn safe_operation(env: &Env) -> Result<(), Error> {
    if Self::is_paused(env) {
        return Err(Error::ContractPaused);
    }
    Ok(())
}
```

---

## 📖 Learning Resources

### Rust
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)

### Stellar Soroban
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Soroban GitHub Examples](https://github.com/stellar/soroban-examples)
- [Stellar Developer Discord](https://discord.gg/stellar)

### Smart Contract Development
- [Smart Contract Best Practices](https://soroban.stellar.org/docs/reference/security)
- [Testing Soroban Contracts](https://soroban.stellar.org/docs/fundamentals-and-concepts/testing)

---


<div align="center">
  <sub>Built with ❤️ for the Stellar community</sub>
  <br/>
  <sub>⭐ Star us on GitHub — it motivates us!</sub>
</div>
