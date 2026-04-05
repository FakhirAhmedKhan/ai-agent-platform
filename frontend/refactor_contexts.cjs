const fs = require('fs');
const path = require('path');

function findFiles(dir, filter, res = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, filter, res);
        } else if (filter.test(filePath)) {
            res.push(filePath);
        }
    }
    return res;
}

const frontendSrcPath = path.join(__dirname, 'src');
const files = findFiles(frontendSrcPath, /\.(jsx|tsx|js|ts)$/);

for (const file of files) {
    if (file.includes('AppContext.jsx') || file.includes('UseAppLogic.js')) continue;

    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // Check if it uses useApp
    if (content.includes('useApp(')) {
        // Find what gets destructured. E.g. const { noteData } = useApp();
        const match = content.match(/const\s*{\s*([^}]+)\s*}\s*=\s*useApp\(\)\s*;/);
        if (match) {
            const props = match[1].split(',').map(s => s.trim()).filter(Boolean);
            
            let contextName = '';
            let hookName = '';
            
            if (props.includes('noteData')) { hookName = 'useNoteContext'; }
            else if (props.includes('taskData')) { hookName = 'useTaskContext'; }
            else if (props.includes('dashBoardData')) { hookName = 'useDashBoardContext'; }
            else if (props.includes('usageData')) { hookName = 'useUsageContext'; }
            else if (props.includes('useAgentData')) { hookName = 'useAgentContext'; }
            else if (props.includes('settingsData')) { hookName = 'useSettingsContext'; }
            else if (props.includes('sideBarData')) { hookName = 'useSideBarContext'; }
            else if (props.includes('useCostEst') || props.includes('useWordCou') || props.includes('usePromptGen') || props.includes('useModelComp')) {
                hookName = 'useEstimatorContext';
            }

            if (hookName) {
                // Replace import
                content = content.replace(/import\s*{\s*useApp\s*}\s*from\s*(['"])[^'"]+AppContext\1;?/, `import { ${hookName} } from "@/AppContext";`);
                content = content.replace(/import\s*{\s*useApp\s*}\s*from\s*(['"])[^'"]+AppContext(\.jsx)?\1;?/, `import { ${hookName} } from "@/AppContext";`);

                // Adjust relative imports if "@/" aliasing is not configured, we'll try to keep relative.
                // Actually it's easier to use a relative path resolver or just fix it.
                // Let's use relative path.
                const relativePath = path.relative(path.dirname(file), path.join(frontendSrcPath, 'AppContext')).replace(/\\/g, '/');
                const finalPath = relativePath.startsWith('.') ? relativePath : `./${relativePath}`;
                
                content = content.replace(/import { useApp } from ".*?AppContext";?/, `import { ${hookName} } from "${finalPath}";`);
                
                // Replace useApp call
                content = content.replace(match[0], `const { ${props.join(', ')} } = ${hookName}();`);
                
                if (original !== content) {
                    fs.writeFileSync(file, content, 'utf-8');
                    console.log(`Updated ${file}`);
                }
            }
        }
    }
}
