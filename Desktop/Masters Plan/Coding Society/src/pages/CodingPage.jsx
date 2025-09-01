import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Play, 
  Square, 
  RotateCcw, 
  Save, 
  Share2, 
  Settings,
  Plus,
  X,
  FileText,
  Folder
} from 'lucide-react';

const CodingPage = () => {
  const [activeTab, setActiveTab] = useState('app.js');
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState('Click "Run Code" to see the output here...');
  const [tabs, setTabs] = useState([
    { id: 'app.js', name: 'app.js', language: 'javascript' },
    { id: 'style.css', name: 'style.css', language: 'css' },
    { id: 'index.html', name: 'index.html', language: 'html' }
  ]);

  const [code, setCode] = useState({
    'app.js': `// Welcome to Coding Society Code Editor!
// Write your JavaScript code here

function greetUser(name) {
  return \`Hello, \${name}! Welcome to Coding Society.\`;
}

const user = "Developer";
const message = greetUser(user);
console.log(message);

// Try creating your own functions and experiments here!
const calculateSum = (a, b) => {
  return a + b;
};

console.log("Sum of 5 + 3 =", calculateSum(5, 3));`,
    'style.css': `/* Add your CSS styles here */

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 20px;
  color: white;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.welcome-message {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.feature-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}`,
    'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Society - Your Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1 class="welcome-message">🚀 Coding Society</h1>
        <div class="feature-card">
            <h2>Welcome to Your Coding Environment!</h2>
            <p>This is a live code editor where you can experiment with HTML, CSS, and JavaScript.</p>
            <p>Make changes in any tab and click "Run Code" to see the results!</p>
        </div>
        
        <div class="feature-card">
            <h3>Features:</h3>
            <ul style="text-align: left; max-width: 300px; margin: 0 auto;">
                <li>✅ Real-time code editing</li>
                <li>✅ Multiple file support</li>
                <li>✅ Syntax highlighting</li>
                <li>✅ Instant preview</li>
                <li>✅ Save and share projects</li>
            </ul>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>`
  });

  const addNewTab = () => {
    const fileName = prompt('Enter file name (e.g., utils.js, styles.css):');
    if (fileName && !tabs.find(tab => tab.name === fileName)) {
      const language = fileName.endsWith('.js') ? 'javascript' : 
                     fileName.endsWith('.css') ? 'css' : 
                     fileName.endsWith('.html') ? 'html' : 'text';
      
      const newTab = { 
        id: fileName, 
        name: fileName, 
        language 
      };
      
      setTabs([...tabs, newTab]);
      setCode({ ...code, [fileName]: `// New ${language} file\n` });
      setActiveTab(fileName);
    }
  };

  const closeTab = (tabId) => {
    if (tabs.length <= 1) return; // Don't close the last tab
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
    
    const newCode = { ...code };
    delete newCode[tabId];
    setCode(newCode);
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('Running your code...\n');
    
    // Simulate code execution
    setTimeout(() => {
      try {
        // Mock execution - in a real app, this would be handled by a code execution service
        const mockConsoleOutput = `Hello, Developer! Welcome to Coding Society.
Sum of 5 + 3 = 8

✅ Code executed successfully!
📊 Execution time: 23ms
🎯 No errors found`;
        
        setOutput(mockConsoleOutput);
      } catch (error) {
        setOutput(`❌ Error: ${error.message}`);
      } finally {
        setIsRunning(false);
      }
    }, 1500);
  };

  const resetCode = () => {
    if (confirm('Are you sure you want to reset all code to default?')) {
      setCode({
        'app.js': `// Welcome to Coding Society Code Editor!
// Write your JavaScript code here

function greetUser(name) {
  return \`Hello, \${name}! Welcome to Coding Society.\`;
}

const user = "Developer";
const message = greetUser(user);
console.log(message);`,
        'style.css': `/* Add your CSS styles here */

body {
  font-family: 'Arial', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 20px;
  color: white;
}`,
        'index.html': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Coding Society - Your Project</title>
</head>
<body>
    <h1>🚀 Coding Society</h1>
    <p>Welcome to your coding environment!</p>
</body>
</html>`
      });
      setOutput('Code reset to default. Click "Run Code" to execute.');
    }
  };

  const saveProject = () => {
    // Mock save functionality
    setOutput(prev => prev + '\n💾 Project saved successfully!');
  };

  const shareProject = () => {
    // Mock share functionality
    const shareUrl = 'https://codingsociety.dev/projects/abc123';
    navigator.clipboard.writeText(shareUrl);
    setOutput(prev => prev + '\n🔗 Share link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Code Editor
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Write, run, and share your code in real-time
            </p>
          </div>
          
          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button onClick={runCode} disabled={isRunning} className="bg-green-600 hover:bg-green-700">
              {isRunning ? <Square className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isRunning ? 'Running...' : 'Run Code'}
            </Button>
            <Button variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
            <Button variant="outline" onClick={saveProject}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" onClick={shareProject}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh]">
          {/* Code Editor */}
          <Card className="flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Code Editor</CardTitle>
                <Button variant="ghost" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              
              {/* File Tabs */}
              <div className="flex items-center gap-1 mt-3">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`flex items-center gap-2 px-3 py-1 rounded-t-lg cursor-pointer transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-b-2 border-blue-500'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <FileText className="w-3 h-3" />
                    <span className="text-sm">{tab.name}</span>
                    {tabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          closeTab(tab.id);
                        }}
                        className="hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 rounded p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={addNewTab}
                  className="ml-2"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-1 p-0">
              <textarea
                value={code[activeTab] || ''}
                onChange={(e) => setCode({ ...code, [activeTab]: e.target.value })}
                className="w-full h-full p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Start coding here..."
                style={{ minHeight: '400px' }}
              />
            </CardContent>
          </Card>

          {/* Output & Preview */}
          <div className="space-y-6">
            {/* Live Preview */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
                <CardDescription>
                  See your HTML and CSS changes in real-time
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 bg-white border rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={`
                      <html>
                        <head>
                          <style>${code['style.css'] || ''}</style>
                        </head>
                        <body>
                          ${code['index.html']?.replace(/<script.*?<\/script>/gs, '') || ''}
                        </body>
                      </html>
                    `}
                    className="w-full h-full border-none"
                    title="Live Preview"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Console Output */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-lg">Console Output</CardTitle>
                <CardDescription>
                  JavaScript execution results and logs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-48 overflow-y-auto font-mono text-sm">
                  <pre className="whitespace-pre-wrap">{output}</pre>
                  {isRunning && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-400"></div>
                      <span className="text-green-400">Executing...</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-500">💡</span>
                <div>
                  <strong>Pro Tip:</strong> Use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">console.log()</code> to debug your JavaScript code.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-500">🎯</span>
                <div>
                  <strong>Quick Save:</strong> Press <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">Ctrl+S</code> to save your project automatically.
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-purple-500">🚀</span>
                <div>
                  <strong>Share Code:</strong> Click the Share button to generate a public link to your project.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodingPage;
