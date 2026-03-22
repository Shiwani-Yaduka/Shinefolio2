// Nursery Section - Interactive Skill Charts
(function() {
  // Skill data with expertise levels (0-100)
  const skillData = {
    languages: {
      title: 'Programming Languages',
      icon: 'fa-solid fa-code',
      skills: {
        'Java': 88,
        'C++': 85,
        'C': 82,
        'Python': 90,
        'JavaScript': 87,
        'SQL': 80,
        'HTML5': 88,
        'CSS': 85
      },
      colors: [
        'rgba(176, 58, 46, 0.8)',   // Java - Red
        'rgba(41, 128, 185, 0.8)',  // C++ - Blue
        'rgba(52, 73, 94, 0.8)',    // C - Dark Blue
        'rgba(39, 174, 96, 0.8)',   // Python - Green
        'rgba(241, 196, 15, 0.8)',  // JavaScript - Yellow
        'rgba(142, 68, 173, 0.8)',  // SQL - Purple
        'rgba(230, 126, 34, 0.8)',  // HTML5 - Orange
        'rgba(52, 152, 219, 0.8)'   // CSS - Light Blue
      ]
    },
    cloud: {
      title: 'Cloud & DevOps',
      icon: 'fa-solid fa-cloud',
      skills: {
        'AWS EC2': 85,
        'S3': 82,
        'Lambda': 78,
        'RDS': 80,
        'Docker': 88,
        'Kubernetes': 82,
        'Jenkins': 85,
        'Git/GitHub': 92
      },
      colors: [
        'rgba(255, 153, 0, 0.8)',
        'rgba(255, 87, 34, 0.8)',
        'rgba(255, 193, 7, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(233, 30, 99, 0.8)'
      ]
    },
    frameworks: {
      title: 'Libraries & Frameworks',
      icon: 'fa-solid fa-layer-group',
      skills: {
        'Flask': 85,
        'OpenAI': 80,
        'Boto3': 82,
        'Streamlit': 78,
        'Gradio': 75,
        'OpenCV': 70,
        'NumPy': 85,
        'Pandas': 88
      },
      colors: [
        'rgba(0, 150, 136, 0.8)',
        'rgba(103, 58, 183, 0.8)',
        'rgba(255, 152, 0, 0.8)',
        'rgba(244, 67, 54, 0.8)',
        'rgba(33, 150, 243, 0.8)',
        'rgba(76, 175, 80, 0.8)',
        'rgba(63, 81, 181, 0.8)',
        'rgba(156, 39, 176, 0.8)'
      ]
    },
    core: {
      title: 'Core Computer Science',
      icon: 'fa-solid fa-brain',
      skills: {
        'DSA': 88,
        'Operating Systems': 82,
        'DBMS': 85,
        'Agile': 80
      },
      colors: [
        'rgba(233, 30, 99, 0.8)',
        'rgba(156, 39, 176, 0.8)',
        'rgba(103, 58, 183, 0.8)',
        'rgba(63, 81, 181, 0.8)'
      ]
    }
  };

  let currentChart = null;
  let currentCategory = 'languages';
  let currentChartType = 'radar';

  // Initialize on DOM load
  document.addEventListener('DOMContentLoaded', function() {
    initializeNursery();
  });

  function initializeNursery() {
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded. Loading from CDN...');
      loadChartJS();
      return;
    }

    setupCategoryButtons();
    setupChartTypeButtons();
    renderChart(currentCategory, currentChartType);
  }

  function loadChartJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
    script.onload = function() {
      console.log('Chart.js loaded successfully');
      initializeNursery();
    };
    document.head.appendChild(script);
  }

  function setupCategoryButtons() {
    const buttons = document.querySelectorAll('.skill-category-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update chart
        currentCategory = category;
        renderChart(category, currentChartType);
      });
    });

    // Set first button as active
    if (buttons.length > 0) {
      buttons[0].classList.add('active');
    }
  }

  function setupChartTypeButtons() {
    const buttons = document.querySelectorAll('.chart-type-btn');
    
    buttons.forEach(btn => {
      btn.addEventListener('click', function() {
        const chartType = this.dataset.chartType;
        
        // Update active state
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        // Update chart
        currentChartType = chartType;
        renderChart(currentCategory, chartType);
      });
    });

    // Set first button as active
    if (buttons.length > 0) {
      buttons[0].classList.add('active');
    }
  }

  function renderChart(category, chartType) {
    const data = skillData[category];
    if (!data) return;

    const canvas = document.getElementById('skillChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Destroy existing chart
    if (currentChart) {
      currentChart.destroy();
    }

    // Update title
    const titleElement = document.querySelector('.chart-title');
    if (titleElement) {
      titleElement.textContent = data.title;
    }

    // Prepare chart data
    const labels = Object.keys(data.skills);
    const values = Object.values(data.skills);

    // Get theme colors
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#F5F5F5' : '#2D2D2D';
    const mutedColor = isDark ? '#AAAAAA' : '#6B6B6B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Create chart configuration based on type
    let chartConfig = {
      type: chartType,
      data: {
        labels: labels,
        datasets: [{
          label: 'Expertise Level',
          data: values,
          backgroundColor: data.colors || values.map((_, i) => {
            const defaultColors = [
              'rgba(107, 0, 24, 0.7)',
              'rgba(26, 92, 69, 0.7)',
              'rgba(200, 168, 75, 0.7)',
              'rgba(157, 149, 255, 0.7)',
              'rgba(255, 45, 120, 0.7)',
              'rgba(10, 164, 72, 0.7)',
              'rgba(255, 135, 9, 0.7)',
              'rgba(0, 186, 226, 0.7)'
            ];
            return defaultColors[i % defaultColors.length];
          }),
          borderColor: data.colors ? data.colors.map(c => c.replace('0.8', '1')) : 'rgba(107, 0, 24, 1)',
          borderWidth: chartType === 'radar' ? 3 : 2,
          pointBackgroundColor: data.colors ? data.colors[0] : 'rgba(107, 0, 24, 0.8)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: chartType === 'radar' ? 6 : 0,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: data.colors ? data.colors[0] : 'rgba(107, 0, 24, 0.8)',
          pointHoverBorderWidth: 3,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: chartType === 'doughnut' || chartType === 'polarArea',
            position: 'bottom',
            labels: {
              font: {
                family: "'DM Mono', monospace",
                size: 11
              },
              color: textColor,
              padding: 15,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: isDark ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.8)',
            titleColor: isDark ? '#0A0A0A' : '#F5F5F5',
            bodyColor: isDark ? '#0A0A0A' : '#F5F5F5',
            titleFont: {
              family: "'Playfair Display', serif",
              size: 14,
              weight: '700'
            },
            bodyFont: {
              family: "'DM Mono', monospace",
              size: 12
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const value = context.parsed.r || context.parsed.y || context.parsed;
                return 'Expertise: ' + value + '%';
              }
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        }
      }
    };

    // Add specific options based on chart type
    if (chartType === 'radar' || chartType === 'polarArea') {
      chartConfig.options.scales = {
        r: {
          beginAtZero: true,
          max: 100,
          min: 0,
          ticks: {
            stepSize: 20,
            font: {
              family: "'DM Mono', monospace",
              size: 11
            },
            color: mutedColor,
            backdropColor: 'transparent'
          },
          grid: {
            color: gridColor,
            lineWidth: 1
          },
          pointLabels: {
            font: {
              family: "'DM Mono', monospace",
              size: 12,
              weight: '500'
            },
            color: textColor,
            padding: 10
          },
          angleLines: {
            color: gridColor,
            lineWidth: 1
          }
        }
      };
    } else if (chartType === 'bar' || chartType === 'line') {
      chartConfig.options.scales = {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            font: {
              family: "'DM Mono', monospace",
              size: 11
            },
            color: mutedColor
          },
          grid: {
            color: gridColor
          }
        },
        x: {
          ticks: {
            font: {
              family: "'DM Mono', monospace",
              size: 11
            },
            color: textColor
          },
          grid: {
            display: false
          }
        }
      };
    }

    // Create chart
    currentChart = new Chart(ctx, chartConfig);

    // Update expertise indicators
    updateExpertiseIndicators(data.skills);

    // Add animation to chart
    animateChartEntry();
  }

  function updateExpertiseIndicators(skills) {
    const legendContainer = document.querySelector('.skill-legend');
    if (!legendContainer) return;

    // Calculate average expertise
    const values = Object.values(skills);
    const average = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    // Update or create expertise indicator
    let indicator = document.querySelector('.expertise-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'expertise-indicator';
      indicator.innerHTML = `
        <span class="expertise-label">Average Expertise</span>
        <div class="expertise-bar">
          <div class="expertise-fill" style="width: 0%"></div>
        </div>
        <span class="expertise-value">0%</span>
      `;
      legendContainer.parentElement.appendChild(indicator);
    }

    // Animate the bar
    setTimeout(() => {
      const fill = indicator.querySelector('.expertise-fill');
      const valueSpan = indicator.querySelector('.expertise-value');
      
      if (fill && valueSpan) {
        fill.style.width = average + '%';
        
        // Animate number
        animateValue(valueSpan, 0, average, 800);
      }
    }, 300);
  }

  function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.round(current) + '%';
    }, 16);
  }

  function animateChartEntry() {
    const chartDisplay = document.querySelector('.chart-display');
    if (chartDisplay) {
      chartDisplay.style.opacity = '0';
      chartDisplay.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        chartDisplay.style.transition = 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
        chartDisplay.style.opacity = '1';
        chartDisplay.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // Add leaves to branches dynamically
  function addLeavesToBranches() {
    const branches = document.querySelectorAll('.branch');
    branches.forEach((branch, index) => {
      if (!branch.querySelector('.leaf')) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        branch.appendChild(leaf);
      }
    });
  }

  // Initialize leaves
  setTimeout(addLeavesToBranches, 100);

  // Expose for external use if needed
  window.NurseryChart = {
    renderChart: renderChart,
    skillData: skillData
  };
})();
