/**
 * ReelNews AI ChatBot - Minimal JavaScript
 * Handles cluster ID functionality and chat interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('ReelNews AI ChatBot initialized');

    // Track basic interactions
    trackUserInteractions();
});

/**
 * Track user interactions for analytics
 */
function trackUserInteractions() {
    // Track cluster ID updates
    const updateButton = document.getElementById('update-cluster-btn');
    if (updateButton) {
        updateButton.addEventListener('click', function() {
            console.log('Cluster ID update requested');
        });
    }

    // Track cluster ID input changes
    const clusterInput = document.getElementById('cluster-id-input');
    if (clusterInput) {
        clusterInput.addEventListener('input', function() {
            console.log('Cluster ID input changed');
        });
    }
}

/**
 * Handle chat widget events
 */
window.addEventListener('load', function() {
    // Check if chat widget is loaded
    setTimeout(() => {
        if (window.n8nChat) {
            console.log('n8n Chat widget loaded successfully');

            // Log current metadata
            const clusterId = localStorage.getItem('cluster_id');
            if (clusterId) {
                console.log('Current cluster_id:', clusterId);
            }
        }
    }, 2000);
});
