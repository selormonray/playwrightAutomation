// @ts-check
import {defineConfig} from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    testDir: "./tests",
    retries: 1,
    workers: 1,

    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        timeout: 5000,
    },

    /* Run tests in files in parallel */
    fullyParallel: true,

    reporter: "html",

    projects: [
        {
            name: "Chrome Execution",
            use: {
                // use helps you select what browser you want to run, to get screenshots, logs. you enter everything here
                browserName: "chromium",
                headless: true,
                screenshot: "only-on-failure",
                trace: 'retain-on-failure',
                ignoreHTTPSErrors: false,
                permissions: ['geolocation'],
                video: "retain-on-failure"


                // trace: 'on',
            }
        },
        {
            name: "Safari Execution",
            use: {
                // use helps you select what browser you want to run, to get screenshots, logs. you enter everything here
                browserName: "webkit",
                headless: true,
                screenshot: "only-on-failure",
                trace: 'retain-on-failure',
                // ...devices['iPad Pro 11'],
                // trace: 'on',
            }
        }

    ]
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */



    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://127.0.0.1:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
