// CV Bottom Sheet Functionality
(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const sheetBtn = document.getElementById('cv-sheet-btn');
    const bottomSheet = document.getElementById('cv-bottom-sheet');
    const overlay = document.getElementById('cv-sheet-overlay');
    const closeBtn = document.getElementById('cv-sheet-close');

    if (!sheetBtn || !bottomSheet || !overlay) return;

    // Open bottom sheet
    function openSheet() {
      bottomSheet.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Close bottom sheet
    function closeSheet() {
      bottomSheet.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    // Event listeners
    sheetBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openSheet();
    });

    overlay.addEventListener('click', closeSheet);
    
    if (closeBtn) {
      closeBtn.addEventListener('click', closeSheet);
    }

    // Close on Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && bottomSheet.classList.contains('active')) {
        closeSheet();
      }
    });

    // Set CV download links
    const GEN_CV_SRC = 'path/to/generalized-cv.pdf'; // Update with actual path
    const SPEC_CV_SRC = 'path/to/specialized-cv.pdf'; // Update with actual path

    const genCvLink = document.getElementById('dl-gen-cv');
    const specCvLink = document.getElementById('dl-spec-cv');

    if (genCvLink) {
      genCvLink.href = GEN_CV_SRC;
      genCvLink.setAttribute('download', 'Shiwani_Yaduka_GeneralizedCV.pdf');
      genCvLink.addEventListener('click', function() {
        setTimeout(closeSheet, 300);
      });
    }

    if (specCvLink) {
      specCvLink.href = SPEC_CV_SRC;
      specCvLink.setAttribute('download', 'Shiwani_Yaduka_SpecializedCV_CloudDevOps.pdf');
      specCvLink.addEventListener('click', function() {
        setTimeout(closeSheet, 300);
      });
    }
  });
})();
