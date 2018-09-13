$fileNames = Get-ChildItem -Path $scriptPath -Recurse

foreach ($file in $fileNames)
{
    if ($file.Name.EndsWith("vert") -Or $file.Name.EndsWith("frag") -Or $file.Name.EndsWith("comp"))
    {
        Write-Host "Compiling $file"
        ./glslc -o $file".spv" $file
    }
}

Write-Host -NoNewLine 'Press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
