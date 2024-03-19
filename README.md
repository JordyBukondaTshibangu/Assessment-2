# Assumption 

- The logging button to open a logging page or modal 
- After accepting the TandCs, the user will be taken to website home page  
- The relevant images and Logo will be provided

# Approach 

- Chose to only use modern Javascript and CSS to prioritize performance rather using a third party library 

# Instructions to run project 

- Download all the files
- Ensure you have these folder structure : 

    - assets(fontawesome, images)
    - minify (index.minify.css, index.minify.js)
    - index.css
    - index.html
    - index.js


- Click on the index.html and it will open in the browser 







# Important Note for performance enhancing

## 1. Optimize Images
The images ./assets//logo.webp used in the page are compressed and in the most efficient format.
Note the lazy loading for images that are not immediately visible, like the congratulatory image in step six.

## 2. Minify and Combine External Resources
CSS and JavaScript Files are minified to remove unnecessary spaces, comments, and characters. 

## 3. Leverage Browser Caching
For external resources like Font Awesome, download and host the resources

## 4. Responsive Images
For images like ./assets//logo.webp, I am using srcset to serve different image sizes based on the viewport width, 
ensuring that mobile devices don't download desktop-sized images.