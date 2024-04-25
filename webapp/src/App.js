import React from 'react';

const apiurlSub = 'http://localhost:8000/subscribe/';
const publicServerKey = "BInYvGYHYBCD2XcsYU2aeth1rDw9aQkUImkKZXsJj0jg3RCoSqBO7_tuFrkzNY33Xkt0I-6zqW5oVwZwcIRgH58";

class App extends React.Component {
    componentDidMount() {
        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js').then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            }).catch(err => {
                console.log('Service Worker registration failed:', err);
            });
        }
    }

    subscribeToNotifications() {
        console.log(`>>> Calling url: ${apiurlSub}`);
        navigator.serviceWorker.ready.then(registration => {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: publicServerKey,
            }).then(subscription => {
                fetch(apiurlSub, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(subscription)
                }).then(() => {
                    console.log('Subscription sent to the server.');
                }).catch(err => {
                    console.log('Failed to send subscription to server:', err);
                });
            }).catch(err => {
                console.log('Failed to subscribe:', err);
            });
        });
    }
    //
    // unSubscribeToNotifications() {
    //     fetch(apiurlUnSub, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     }).then(() => {
    //         console.log('Subscription sent to the server.');
    //     }).catch(err => {
    //         console.log('Failed to send subscription to server:', err);
    //     });
    // }
    //
    // testNotifications() {
    //     fetch(apiurlTest, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     }).then(() => {
    //         console.log('Test sent to the server.');
    //     }).catch(err => {
    //         console.log('Failed to send subscription to server:', err);
    //     });
    // }

    render() {
        return (
            <div className="container">
                <div className="">
                    <h2>Push Notification Example</h2>
                </div>
                <div className="">
                    <button type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => this.subscribeToNotifications()}>
                        Subscribe
                    </button>
                    {/*<button type="button"*/}
                    {/*        className="btn btn-sm btn-danger"*/}
                    {/*        onClick={() => this.unSubscribeToNotifications()}>*/}
                    {/*    Un-Subscribe*/}
                    {/*</button>*/}
                    {/*<button type="button"*/}
                    {/*        className="btn btn-sm btn-info"*/}
                    {/*        onClick={() => this.testNotifications()}>*/}
                    {/*    Test*/}
                    {/*</button>*/}
                </div>
            </div>
        );
    }
}

export default App;
