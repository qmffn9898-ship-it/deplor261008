const tabButtons = document.querySelectorAll(".tab-button");
const pages = document.querySelectorAll(".page");
const nextButton = document.querySelector(".next-button");

// 선택한 탭 버튼과 연결된 콘텐츠 영역을 활성화하는 단일 함수
function activateTab(targetButton) {
    const targetPage = document.getElementById(targetButton.dataset.page);
    if (!targetPage) {
        console.error("해당 콘텐츠를 찾을 수 없습니다:", targetButton.dataset.page);
        return;
    }

    tabButtons.forEach((btn) => btn.classList.toggle("active", btn === targetButton));
    pages.forEach((page) => page.classList.toggle("active", page === targetPage));
}

// 상단 아이콘 클릭 이벤트 등록
tabButtons.forEach((button) => {
    button.addEventListener("click", () => activateTab(button));
});

// 우측 화살표 클릭 시 다음 탭으로 순환 이동
nextButton?.addEventListener("click", () => {
    const currentIndex = [...tabButtons].findIndex((btn) => btn.classList.contains("active"));
    const nextIndex = (currentIndex + 1) % tabButtons.length;
    activateTab(tabButtons[nextIndex]);
});

const portfolioGuideButton = document.querySelector(
    "#portfolio-guide-button"
);

if (portfolioGuideButton) {
    portfolioGuideButton.addEventListener("click", () => {
        alert(
            "제 포트폴리오에 오신 것을 환영합니다!\n\n" +
            "자기소개, 경력 및 기술, 연락처, SNS 메뉴를 " +
            "클릭하여 정보를 확인해 주세요."
        );
    });
}

// Vue를 이용한 실시간 한국 시간 표시
if (window.Vue) {
    const clockElement = document.querySelector("#clock-app");

    if (clockElement) {
        const clockFormatter = new Intl.DateTimeFormat("ko-KR", {
            timeZone: "Asia/Seoul",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        });

        window.Vue.createApp({
            data() {
                return {
                    currentTime: clockFormatter.format(new Date()),
                    timerId: null
                };
            },

            mounted() {
                this.timerId = window.setInterval(() => {
                    this.currentTime =
                        clockFormatter.format(new Date());
                }, 1000);
            },

            beforeUnmount() {
                if (this.timerId !== null) {
                    window.clearInterval(this.timerId);
                }
            }
        }).mount(clockElement);
    }
}