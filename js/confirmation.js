document.addEventListener("DOMContentLoaded", function () {
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder") || "{}");
    const orderSummary = document.getElementById("orderSummary");

    if (lastOrder.items && lastOrder.items.length > 0) {
        let summaryHTML = `
                    <p><strong>Order #:</strong> ${lastOrder.id}</p>
                    <p><strong>Date:</strong> ${new Date(lastOrder.date).toLocaleDateString()}</p>
                    <p><strong>Items:</strong></p>
                    <ul class="ml-4 space-y-1">
                `;

        lastOrder.items.forEach((item) => {
            summaryHTML += `<li>• ${item.title} by ${item.artist} - €${item.price}</li>`;
        });

        summaryHTML += `
                    </ul>
                    <p class="text-xl font-bold mt-4"><strong>Total: €${lastOrder.total}</strong></p>
                `;

        orderSummary.innerHTML = summaryHTML;
    }

    const facts = [
        "The longest-playing vinyl record ever made was 90 minutes long and required a special turntable!",
        "Vinyl records are made from polyvinyl chloride (PVC), which is why they're called 'vinyl'.",
        "The first vinyl records were introduced in 1930 by RCA Victor.",
        "A standard LP (Long Play) record spins at 33⅓ RPM and can hold about 22 minutes per side.",
        "The largest vinyl record collection belongs to Zero Freitas from Brazil with over 6 million records!",
        "Vinyl sales have been growing for 15 consecutive years, outselling CDs since 2020.",
        "The most expensive vinyl record ever sold was Wu-Tang Clan's 'Once Upon a Time in Shaolin' for $2 million.",
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    document.getElementById("randomFact").textContent = randomFact;
});