# TaskManager Pro - Decentralized Escrow and Bounty Management Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Rust](https://img.shields.io/badge/Rust-1.84%2B-orange.svg)](https://www.rust-lang.org)
[![Stellar](https://img.shields.io/badge/Stellar-Soroban-blue.svg)](https://stellar.org)

<div align="center">
  <img src="./assets/banner.png" alt="TaskManager Pro Banner" width="800"/>
  <h3>A Decentralized Milestone and Payout Escrow Network on Stellar</h3>
  <p><i>Securely fund, track, and complete professional tasks utilizing automated smart-contract escrows.</i></p>
</div>

---

## Overview

TaskManager Pro is a next-generation decentralized workflow and bounty management system powered by Stellar's Soroban smart contracts. The protocol connects project administrators/creators with developers, ensuring funds are locked securely in on-chain escrows and paid out upon satisfactory work delivery. 

By utilizing Stellar's native token transfers and fast ledger times, TaskManager Pro reduces payment counterparty risks, implements platform fee routing, and provides robust dispute resolution mechanisms.

---

## Key Features

| Feature | Description |
|---------|-------------|
| Escrowed Task Creation | Creators fund and launch tasks with rewards locked securely inside the smart contract escrow. |
| Assignment System | Developers claim open tasks, moving the contract status into an active "In Progress" workflow state. |
| Workflow Automation | Enforces structured transitions: Open → InProgress → Completed → Verified. |
| Split Dispute Resolution | In case of disagreement, admins act as mediators to resolve disputes and allocate custom reward splits between creators and assignees. |
| Automated Platform Fees | Platform fees (in basis points) are calculated and routed to a designated fee recipient address upon task completion. |
| Task Cancellations | Creators can cancel open tasks and withdraw locked reward funds if no developer has claimed the work. |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    TaskManager Pro Contract                  │
├─────────────────────────────────────────────────────────────┤
│                        Storage Layer                         │
│  ┌──────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │    Tasks     │  │  Escrow Balances  │  │ Platform Config│  │
│  └──────────────┘  └──────────────────┘  └────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      Business Logic                          │
│  ┌──────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │ Workflow State│  │ Dispute Arbitrage│  │ Payout Splits  │  │
│  └──────────────┘  └──────────────────┘  └────────────────┘  │
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

## Project Structure

```
Latterfix/
├── contract/              # Soroban Smart Contract (Rust)
│   ├── Cargo.toml         # Contract build configuration
│   └── src/
│       ├── lib.rs         # Smart contract logic (escrow, dispute, config)
│       └── test.rs        # Comprehensive automated test suite
├── backend/               # API Caching and Sync Server (Node.js/Express)
│   ├── index.js           # Server routes & SQLite database storage
│   └── package.json       # Backend dependencies (express, sqlite3, stellar-sdk)
├── frontend/              # Interactive Client Dashboard (Next.js 15)
│   ├── app/               # React components, styles, layouts
│   └── package.json       # Frontend dependencies (tailwind, lucide, framer-motion)
└── assets/                # Design assets and brand logos
```

---

## Smart Contract Overview

### Data Schemas

```rust
// Task structure stored on-chain
pub struct Task {
    pub id: u32,
    pub title: String,
    pub description: String,
    pub reward: i128,
    pub assignee: Option<Address>,
    pub status: TaskStatus,
    pub created_by: Address,
    pub tags: Vec<String>,
}

// Enforced task states
pub enum TaskStatus {
    Open,
    InProgress,
    Completed,
    Disputed,
    Verified,
    Cancelled,
}
```

### Core API Methods

*   `initialize(env: Env, admin: Address, platform_fee_bps: u32, token_contract: Address, fee_recipient: Address)`
    Configures contract admin, platform fee percentage (in BPS), token contract address, and designated fee payout destination.
*   `create_task(env: Env, creator: Address, title: String, description: String, reward: i128, tags: Vec<String>) -> u32`
    Creates a new task. Transports the task reward from the creator to the contract's escrow address.
*   `assign_task(env: Env, assignee: Address, task_id: u32)`
    Claims an open task and changes its status to `InProgress`.
*   `submit_work(env: Env, assignee: Address, task_id: u32, delivery_url: String)`
    Allows the assignee to submit their delivery link, advancing the status to `Completed`.
*   `complete_task(env: Env, caller: Address, task_id: u32)`
    Releases the locked escrow tokens to the assignee (minus the platform fee) and closes the task. Executable by creator or admin.
*   `cancel_task(env: Env, creator: Address, task_id: u32)`
    Cancels an open task and refunds the escrowed tokens back to the creator.
*   `dispute_task(env: Env, caller: Address, task_id: u32)`
    Transitions an active or completed task into a `Disputed` state.
*   `resolve_dispute(env: Env, admin: Address, task_id: u32, creator_refund: i128, assignee_payout: i128)`
    Allows the admin to resolve a dispute by allocating customized reward splits between the creator and the developer.

---

## Development and Testing

### Smart Contract

To run automated unit tests that verify initialization, contract states, payouts, fee deductions, and dispute splits:

```bash
cd contract
cargo test
```

To build the contract into an optimized WASM target:

```bash
cd contract
cargo build --target wasm32-unknown-unknown --release
```

### Backend Server

Start the API caching backend (port 3001) that verifies transactions via the Stellar Horizon client:

```bash
cd backend
npm install
npm start
```

### Frontend Client

Launch the interactive Next.js web application (port 3000):

```bash
cd frontend
npm install
npm run dev
```

---

## Learning Resources

### Stellar Soroban
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Stellar Developer Discord](https://discord.gg/stellar)
- [Testing Soroban Contracts Reference](https://soroban.stellar.org/docs/fundamentals-and-concepts/testing)

### Rust
- [The Rust Book](https://doc.rust-lang.org/book/)
- [Rust by Example](https://doc.rust-lang.org/rust-by-example/)
