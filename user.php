<?php
// Define the directory path from which you want to fetch files
$directory = "C:\Users\Lenovo\Desktop\compile\temp";

// Fetch files from the directory
$files = scandir($directory);

// Loop through the files
foreach ($files as $file) {
    // Exclude special directory pointers
    if ($file != "." && $file != "..") {
        // Output the file name
        echo $file . "<br>";
    }
}
?>
