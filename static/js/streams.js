const APP_ID = 'da9b2dbc33464851b922433a743fa719'
const CHANNEL = 'main'
const TOKEN = '007eJxTYGCpPKC+6r2Xdo7BK8Z9jotkvKN/yJy3E5o5OdfJx2XPmloFhpREyySjlKRkY2MTMxMLU8MkSyMjE2PjRHMT47REc0PLmqA1yQ2BjAxLzp1iZGSAQBCfhSE3MTOPgQEAufId6A=='

const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8'
});

let localTracks = []
let remoteUsers = {}

let joinAndDisplayLocalStream = async () => {
    UID = await client.join(APP_ID, CHANNEL, TOKEN, null)

    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()

    let player = `
    <div class="video-container" id="user-container-${UID}">
    <div id="username-wrapper"><span class="user-name">My Name</span></div>
    <div class="video-player" id="user-${UID}"></div>
</div>`
    document.getElementById('video-streams').insertAdjacentHTML('beforeend', player);
    localTracks[1].play(`user-${UID}`);

    await client.publish([localTracks[0], localTracks[1]]);
};

joinAndDisplayLocalStream();