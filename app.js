// Initialize Icons
lucide.createIcons();

// Tab Switching Logic
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    // Show selected section
    document.getElementById('view-' + tabId).classList.remove('hidden');
    
    // Update nav button styles
    const navButtons = {
        closet: document.getElementById('nav-closet'),
        generate: document.getElementById('nav-generate'),
        social: document.getElementById('nav-social')
    };

    // Reset all buttons
    Object.values(navButtons).forEach(btn => {
        const icon = btn.querySelector('i');
        const label = btn.querySelector('span');
        if (icon) icon.className = icon.className.replace('text-[#FFD700]', 'text-gray-500');
        if (label) label.className = label.className.replace('text-[#FFD700]', 'text-gray-500');
    });

    // Highlight active button
    if (navButtons[tabId]) {
        const icon = navButtons[tabId].querySelector('i');
        const label = navButtons[tabId].querySelector('span');
        if (icon && tabId !== 'generate') {
            icon.className = icon.className.replace('text-gray-500', 'text-[#FFD700]');
        }
        if (label) {
            label.className = label.className.replace('text-gray-500', 'text-[#FFD700]');
        }
    }

    // Re-initialize icons after DOM changes
    lucide.createIcons();
}

// Toggle Switch Function
function toggleSwitch(element) {
    element.classList.toggle('active');
}

// Modal Logic
function openModal(modalId) {
    document.getElementById(modalId).classList.remove('hidden');
    lucide.createIcons(); // Re-init icons when modal opens
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Profile Edit Toggle
function toggleProfileEdit(isEditing) {
    const viewState = document.getElementById('profile-view-state');
    const editState = document.getElementById('profile-edit-state');
    if (isEditing) {
        viewState.classList.add('hidden');
        editState.classList.remove('hidden');
    } else {
        viewState.classList.remove('hidden');
        editState.classList.add('hidden');
    }
}

// File Upload Functions
function openCamera() {
    const cameraInput = document.getElementById('cameraInput');
    cameraInput.click();
}

function openFileLibrary() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function openGoogleDrive() {
    // For now, open Google Drive in a new tab
    // In production, you would implement Google Picker API
    window.open('https://drive.google.com', '_blank');
    alert('You can download images from Google Drive and then upload them using the library option.');
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create a new clothing item with the uploaded image
            const closetGrid = document.querySelector('#view-closet .grid');
            
            const newItem = document.createElement('div');
            newItem.className = 'clothing-item';
            newItem.innerHTML = `
                <img src="${e.target.result}" alt="Uploaded Item">
                <div class="p-3">
                    <span class="inline-block bg-gray-700 text-[10px] px-2 py-1 rounded-full mb-1">New</span>
                </div>
            `;
            
            // Insert the new item before the add button
            closetGrid.insertBefore(newItem, closetGrid.children[1]);
            
            // Close the modal
            closeModal('addItemModal');
            
            // Show success message
            showNotification('Item added to your closet!');
        };
        reader.readAsDataURL(file);
    }
}

function showNotification(message) {
    // Create a simple notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-4 right-4 max-w-md mx-auto bg-green-500/90 text-white px-4 py-3 rounded-xl z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Tag Editing Functions
let currentTagElement = null;

function openTagEditor(element) {
    currentTagElement = element;
    const tagInput = document.getElementById('tagInput');
    tagInput.value = element.textContent.trim();
    openModal('tagEditorModal');
    tagInput.focus();
    tagInput.select();
}

function saveTagEdit() {
    if (currentTagElement) {
        const newTagName = document.getElementById('tagInput').value.trim();
        if (newTagName) {
            currentTagElement.textContent = newTagName;
            closeModal('tagEditorModal');
            showNotification('Tag updated!');
        } else {
            alert('Please enter a tag name.');
        }
    }
}

// Remove Clothing Item Function
function removeClothingItem(button) {
    const clothingItem = button.closest('.clothing-item');
    clothingItem.style.transition = 'all 0.3s ease-out';
    clothingItem.style.opacity = '0';
    clothingItem.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        clothingItem.remove();
        showNotification('Item removed from closet');
        lucide.createIcons();
    }, 300);
}

// Generate Outfit Functions
function showGenerateFromCloset() {
        document.getElementById('generateMainHeader').classList.add('hidden');
    document.getElementById('generateOptionsContainer').classList.add('hidden');
    document.getElementById('generateFromClosetView').classList.remove('hidden');
}

function showGenerateAtMoment() {
        document.getElementById('generateMainHeader').classList.add('hidden');
    document.getElementById('generateOptionsContainer').classList.add('hidden');
    document.getElementById('generateAtMomentView').classList.remove('hidden');
}

function showGenerateRandom() {
        document.getElementById('generateMainHeader').classList.add('hidden');
    document.getElementById('generateOptionsContainer').classList.add('hidden');
    document.getElementById('generateRandomView').classList.remove('hidden');
}

function goBackToGenerateOptions() {
        document.getElementById('generateMainHeader').classList.remove('hidden');
    document.getElementById('generateOptionsContainer').classList.remove('hidden');
    document.getElementById('generateFromClosetView').classList.add('hidden');
    document.getElementById('generateAtMomentView').classList.add('hidden');
    document.getElementById('generateRandomView').classList.add('hidden');
}

function openMomentPhotoUpload() {
    document.getElementById('momentPhotoInput').click();
}

function handleMomentPhotoUpload(event) {
    const files = event.target.files;
    if (files.length > 0) {
        const container = document.getElementById('momentPhotosContainer');
        
        for (let file of files) {
            const reader = new FileReader();
            reader.onload = function(e) {
                // Create photo preview item
                const photoItem = document.createElement('div');
                photoItem.className = 'relative rounded-xl overflow-hidden bg-gray-800 border border-gray-700 group';
                photoItem.innerHTML = `
                    <img src="${e.target.result}" alt="Upload" class="w-full h-32 object-cover">
                    <button onclick="this.closest('div').remove()" class="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <i data-lucide="x" class="w-3 h-3 text-white"></i>
                    </button>
                `;
                container.appendChild(photoItem);
                lucide.createIcons();
            };
            reader.readAsDataURL(file);
        }
        
        showNotification(`${files.length} photo(s) added!`);
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});
