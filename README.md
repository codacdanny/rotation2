# Rotation Two Game App

## Introduction

This document outlines the features and functionalities of the "Rotation Two" game app, providing guidance for developers during the software development process.

## Overview

Rotation Two is a multiplayer game app with various levels and real-time interactions. Users register and log in to access features, including funding their wallet, sharing funds, placing withdrawals, adjusting settings, logging out, and playing the game. Additionally, an admin dashboard is implemented to monitor and manage user activities.

## TOOLS

This web application is built with React for the frontend and nodeJs for the backend.

### How to Use

Git clone the project
open the repo locally
pnpm install to download all the packages.
pnpm run dev.

## User Interface

### Registration/Login Form

An aesthetically pleasing registration and login form is provided, with users agreeing to terms and conditions during registration.

### User Dashboard

The user dashboard features sections for:

- Fund Wallet
- Share Wallet
- Place Withdrawal
- Settings
- Log Out
- Play Game
- Countdown Timer for upcoming game
- Etc

## Gameplay

### Funding Wallet

Before playing the game, users must fund their wallets.

### Play Game

In the play game section, users click the stake button before the timer expires. Clicking the button pairs the user with another player, deducting 200 naira from each wallet. After the countdown, the game begins, displaying players' pictures, scores, and a deck of ten cards with numbers. The system notifies players to choose a card within 20 seconds. Failure results in automatic loss. After card selection, scores are calculated, and the player with the highest scores wins.

### Level Progression

Winners move to the next level. Winners without pairing move to the next level, awaiting matches from the previous level.

- Levels 1 and 2: Winners cannot withdraw earnings.
- Levels 3-15: Winners can cash out earnings.
- Level 16 and beyond: Remaining players compete on national TV.

### Cash Out

From level 3, a cash-out button displaying a specific amount appears on the player's device. Earnings double as the game progresses. Before starting a new level, players are warned to withdraw or continue playing within a 20-second countdown. If no decision is made, the player automatically proceeds to the next level.

## Admin Dashboard

### Features

The admin dashboard includes:

- Total number of registered members
- Total number of members playing the game
- Total number of players remaining as levels increase
- Fund User Wallet
- Credit User
- View User Information
- Log Out
- Settings
- View Wallet
- Block a User
- Message a User
- Etc.

## Conclusion

This specification document provides comprehensive details for the Rotation Two game app, ensuring accurate implementation of features and functionalities. Developers should refer to this document throughout the software development process.
