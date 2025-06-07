document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("question-form");
  const questionsContainer = document.getElementById("questions");
  const resultsContainer = document.getElementById("results");

  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${q}</p>
      <label><input type="radio" name="q${index}" value="yes"> 예</label>
      <label><input type="radio" name="q${index}" value="no"> 아니오</label>
    `;
    questionsContainer.appendChild(div);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let yesCount = 0;
    for (let i = 0; i < questions.length; i++) {
      const answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (answer && answer.value === "yes") yesCount++;
    }

    const suggestions = [
      "텀블러를 들고 다니세요 ☕",
      "장바구니를 꼭 챙기세요 🛍️",
      "일회용 수저는 받지 마세요 🍴",
      "제로웨이스트 샵을 이용해보세요 ♻️",
      "플라스틱 대신 유리용기를 사용해보세요 🧴"
    ];

    const selected = suggestions.slice(0, Math.min(yesCount, suggestions.length));
    const percentage = Math.round((yesCount / questions.length) * 100);
    let color = "#ff9999";
    if (percentage >= 80) color = "#aee1d4";
    else if (percentage >= 50) color = "#ffe9a7";

    const badge = percentage >= 80 ? "🌟 습관 마스터 뱃지 획득!" :
                   percentage >= 50 ? "🎖️ 실천 중급자 뱃지!" :
                   "🔰 이제 시작이에요!";

    const today = new Date().toLocaleDateString('ko-KR');

    resultsContainer.innerHTML = `
      <h2>${today} 추천 루틴</h2>
      ${selected.map(s => `<p>${s}</p>`).join("")}
      <div style="margin-top:20px; background:${color}; padding:1rem; border-radius:10px;">
        <strong>환경 실천 점수: ${percentage}%</strong>
        <p>${percentage >= 80 ? "훌륭해요! 계속 실천해요 💚" : percentage >= 50 ? "좋아요! 조금만 더 실천해봐요 🌱" : "시작이 반이에요! 지금부터 실천해봐요 🌍"}</p>
        <p><strong>${badge}</strong></p>
      </div>
      <button id="share-button" style="margin-top:1rem;">트위터에 공유하기</button>
    `;

    const calendar = document.getElementById("calendar-log");
    const entry = document.createElement("li");
    entry.textContent = `${today} - 점수 ${percentage}% - ${badge}`;
    calendar.appendChild(entry);

    resultsContainer.classList.remove("hidden");

    document.getElementById("share-button").addEventListener("click", () => {
      const text = `나의 제로웨이스트 점수는 ${percentage}%! 🌿 추천 루틴: ${selected.join(", ")} #제로웨이스트 #환경실천`;
      const shareUrl = "https://www.nopll.net";
      const shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(shareLink, '_blank');
    });
  });
});
