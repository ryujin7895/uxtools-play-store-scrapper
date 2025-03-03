# Play Store Comment Analysis Tool

An open-source UI tool for collecting and analyzing Google Play Store comments to facilitate Product Research and UX Research.

## Overview

This tool helps product managers, UX researchers, and developers gather valuable user feedback from Play Store comments. By analyzing these comments, you can identify patterns, feature requests, pain points, and user sentiment to make data-driven decisions for your product.

## Features

- **Comment Collection**: Easily collect comments from Google Play Store for any application
- **Data Analysis**: Analyze comment sentiment, frequency, and patterns
- **Visualization**: View comments in an organized, filterable interface
- **Export Options**: Export collected data for further analysis in other tools
- **User-Friendly Interface**: Built with Remix and Tailwind CSS for a seamless experience

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/playstore-comment.git
   cd playstore-comment/my-remix-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file based on `.env.example` (if available)
   - Add necessary API keys and configuration

## Usage

### Development

Run the development server:

```sh
npm run dev
```

This will start the application at `http://localhost:3000`.

### Production

Build the application for production:

```sh
npm run build
```

Start the production server:

```sh
npm start
```

## How It Works

1. Enter the Play Store URL or app ID for the application you want to analyze
2. The tool fetches available comments from the Play Store
3. View and filter comments based on rating, date, or specific keywords
4. Generate insights and visualizations based on the collected data
5. Export the data for further analysis

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Built with [Remix](https://remix.run/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by the needs of Product and UX researchers worldwide

---

Made with ❤️ for the product research community
