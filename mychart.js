document.addEventListener('DOMContentLoaded', function() {
    // Canvas elementini al
    const ctx = document.getElementById('complexityChart').getContext('2d');
    
    // Veri değerleri (n = 1 den 10'a)
    const n = Array.from({length: 15}, (_, i) => i + 1);
    
    // Farklı karmaşıklık sınıfları için değerleri hesapla
    const constant = Array(15).fill(1);
    const logarithmic = n.map(x => Math.log2(x) || 0.1);
    const linear = [...n];
    const linearithmic = n.map(x => x * Math.log2(x) || 0.1);
    const quadratic = n.map(x => x * x);
    const exponential = n.map(x => Math.min(2 ** x, 500)); // Grafiği aşırı yükseltmemesi için sınırlandırıyoruz
    const factorial = n.map(x => {
        let result = 1;
        for(let i = 2; i <= x; i++) result *= i;
        return Math.min(result, 500); // Çok büyük değerleri sınırlandırıyoruz
    });
    
    // Grafiği oluştur
    const complexityChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: n,
            datasets: [
                {
                    label: 'O(1) - Constant',
                    data: constant,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(log n) - Logarithmic',
                    data: logarithmic,
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(n) - Linear',
                    data: linear,
                    borderColor: '#9b59b6',
                    backgroundColor: 'rgba(155, 89, 182, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(n log n) - Linearithmetic',
                    data: linearithmic,
                    borderColor: '#f1c40f',
                    backgroundColor: 'rgba(241, 196, 15, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(n²) - Quadratic',
                    data: quadratic,
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(2ⁿ) - Exponential',
                    data: exponential,
                    borderColor: '#e67e22',
                    backgroundColor: 'rgba(230, 126, 34, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                },
                {
                    label: 'O(n!) - Factorial',
                    data: factorial,
                    borderColor: '#c0392b',
                    backgroundColor: 'rgba(192, 57, 43, 0.1)',
                    borderWidth: 2,
                    tension: 0.1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Process time'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value > 100) return "≥100";
                            return value;
                        }
                    },
                    max: 100 // Y eksenini sınırlandırıyoruz
                },
                x: {
                    title: {
                        display: true,
                        text: 'Input Size (n)'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Comparison of Big-O Notations',
                    font: {
                        size: 16
                    },
                    padding: {
                        top: 10,
                        bottom: 20
                    }
                },
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        boxWidth: 15
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.raw.toFixed(2);
                            return label;
                        }
                    }
                }
            }
        }
    });
});