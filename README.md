[![Test](https://github.com/kmdtmyk/rsql/workflows/Test/badge.svg)](https://github.com/kmdtmyk/rsql/actions)

# Rsql

## Installation

Gemfile

```ruby
gem 'rsql', git: 'https://github.com/kmdtmyk/rsql'
```

## Usage

config/routes.rb

```ruby
Rails.application.routes.draw do
  mount Rsql::Engine => '/sql'
end
```

Open http://localhost/sql

![screenshot](screenshot.png)

## Test

```bash
npm test
```

```bash
rspec
```

## License

MIT
