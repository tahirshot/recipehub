import React, { useState } from 'react';
import { useRecipe } from '../../context/RecipeContext';
import { FLUTTER_CODEBASE, FlutterFile } from '../../data/flutterCodebase';
import JSZip from 'jszip';
import {
  X,
  Download,
  Copy,
  Check,
  Code2,
  FolderTree,
  FileCode,
  GraduationCap,
  Sparkles,
  Smartphone,
  ExternalLink,
  Terminal,
} from 'lucide-react';

export const FlutterStudioModal: React.FC = () => {
  const { isFlutterStudioOpen, setIsFlutterStudioOpen } = useRecipe();
  const [selectedFile, setSelectedFile] = useState<FlutterFile>(FLUTTER_CODEBASE[1]); // main.dart
  const [copied, setCopied] = useState(false);
  const [downloadingZip, setDownloadingZip] = useState(false);
  const [activeTab, setActiveTab] = useState<'code' | 'viva' | 'apk'>('code');

  if (!isFlutterStudioOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(selectedFile.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadZip = async () => {
    try {
      setDownloadingZip(true);
      const zip = new JSZip();
      const rootFolder = zip.folder('recipe_hub');

      FLUTTER_CODEBASE.forEach((file) => {
        rootFolder?.file(file.path, file.code);
      });

      // Add a quick start script
      rootFolder?.file(
        'RUN_PROJECT.sh',
        `#!/usr/bin/env bash
echo "Setting up RecipeHub Flutter Project..."
flutter pub get
flutter run
`
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'RecipeHub_Flutter_Project.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to create ZIP', err);
      alert('Could not generate ZIP archive. You can copy the code files individually.');
    } finally {
      setDownloadingZip(false);
    }
  };

  const vivaQuestions = [
    {
      q: '1. Why did you choose Provider for state management instead of setState or Bloc?',
      a: 'Provider with ChangeNotifier is the official recommendation from the Flutter team for medium-scale apps. Unlike setState (which only rebuilds the local widget and causes prop drilling), Provider allows any widget in the tree to listen to shared state (e.g. favorites count in bottom nav, personal recipes in home and explore). Compared to Bloc, Provider has significantly less boilerplate and is much easier to test and explain during project viva.',
    },
    {
      q: '2. How does ChangeNotifier work under the hood?',
      a: 'ChangeNotifier implements the Observer Pattern (Listenable). When a state change occurs (e.g., toggleFavorite or addPersonalRecipe), we mutate the list and invoke notifyListeners(). Any widget wrapped in context.watch<RecipeProvider>() or Consumer<RecipeProvider> is immediately scheduled for rebuild with the new state.',
    },
    {
      q: '3. How does RecipeHub handle the 4 required list states (Loading, Error, Empty, Data)?',
      a: 'In RecipeProvider, we declare an enum RecipeListState { loading, error, empty, data }. In the RecipeListScreen, we inspect this state inside a Builder widget: (1) loading displays SpinKitFadingCircle, (2) error renders an error card with a retry button, (3) empty shows a no-results prompt with filter reset, and (4) data populates the GridView with recipe cards.',
    },
    {
      q: '4. How are personal recipes and favourites saved permanently?',
      a: 'We use the shared_preferences package. Favourites are stored as a List<String> of recipe IDs. Personal recipes are converted to JSON maps using the Recipe.toJson() method, encoded via json.encode(), and stored as a JSON string under "recipehub_personal_recipes". On app boot in main.dart, SharedPreferences is read and deserialized back into typed Recipe instances.',
    },
    {
      q: '5. How does form validation work in AddRecipeScreen?',
      a: 'We wrap the inputs in a Form widget with a GlobalKey<FormState> (_formKey). Each input uses a TextFormField with a validator callback checking for null, empty strings, min character length (3+ for title, 20+ for instructions), and numeric constraints (>0 for cook time). When the user taps submit, _formKey.currentState!.validate() runs all validations and highlights errors.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4 bg-[#FFFDF9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center text-orange-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">
                  RecipeHub Flutter Code Studio & Exporter
                </h2>
                <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                  Flutter 3.35+
                </span>
              </div>
              <p className="text-xs text-stone-500">
                Complete, production-grade Flutter source code meeting 100% of college project requirements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadZip}
              disabled={downloadingZip}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{downloadingZip ? 'Creating ZIP...' : 'Download Project (.ZIP)'}</span>
            </button>

            <button
              onClick={() => setIsFlutterStudioOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Subnav Tabs */}
        <div className="px-6 border-b border-stone-200 flex items-center gap-6 bg-stone-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('code')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'code'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>Flutter Source Code ({FLUTTER_CODEBASE.length} files)</span>
          </button>

          <button
            onClick={() => setActiveTab('viva')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'viva'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>College Viva / Defense Q&A</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`py-3 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'apk'
                ? 'border-orange-600 text-orange-600 font-bold'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>APK Build Guide</span>
          </button>
        </div>

        {/* Modal Main Body */}
        {activeTab === 'code' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar File Explorer */}
            <div className="w-full md:w-72 bg-stone-50 border-r border-stone-200 p-3 overflow-y-auto shrink-0 space-y-1">
              <div className="text-[11px] font-bold text-stone-400 uppercase tracking-wider px-3 py-1.5 flex items-center gap-1.5">
                <FolderTree className="w-3.5 h-3.5" />
                <span>Project Files</span>
              </div>

              {FLUTTER_CODEBASE.map((file) => {
                const isSelected = selectedFile.path === file.path;
                return (
                  <button
                    key={file.path}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-orange-600 text-white font-semibold shadow-xs'
                        : 'text-stone-700 hover:bg-stone-200/70'
                    }`}
                  >
                    <div className="truncate">
                      <span className="block truncate font-mono">{file.path}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Code Content Area */}
            <div className="flex-1 flex flex-col bg-stone-950 text-stone-100 overflow-hidden">
              {/* File Info Bar */}
              <div className="px-5 py-3 bg-stone-900 border-b border-stone-800 flex items-center justify-between gap-4">
                <div className="truncate">
                  <span className="text-xs font-mono font-bold text-orange-400 block truncate">
                    {selectedFile.path}
                  </span>
                  <span className="text-[11px] text-stone-400 line-clamp-1">
                    {selectedFile.description}
                  </span>
                </div>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Pre Block */}
              <div className="flex-1 overflow-auto p-4 sm:p-6 font-mono text-xs leading-relaxed text-stone-200">
                <pre>
                  <code>{selectedFile.code}</code>
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Viva / Defense Q&A Tab */}
        {activeTab === 'viva' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-stone-50/50">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-xs text-orange-900 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold">Faculty Evaluation Viva Preparation</h4>
                  <p className="mt-0.5 leading-relaxed">
                    Every team member must be able to explain how the code works during the project demonstration. These 5 questions directly cover the college evaluation checklist.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {vivaQuestions.map((item, idx) => (
                  <div key={idx} className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-xs space-y-2">
                    <h3 className="text-sm font-bold text-stone-900">{item.q}</h3>
                    <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-xl border border-stone-100">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* APK Build Guide Tab */}
        {activeTab === 'apk' && (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 bg-stone-50/50">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <h3 className="text-base font-bold text-stone-900 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-orange-600" />
                  <span>How to Build Release APK in Terminal</span>
                </h3>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 block mb-1">
                      Step 1: Clean build cache and resolve dependencies
                    </span>
                    <pre className="bg-stone-900 text-stone-200 p-3 rounded-xl font-mono">
                      flutter clean && flutter pub get
                    </pre>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-700 block mb-1">
                      Step 2: Generate release APK for physical Android phones
                    </span>
                    <pre className="bg-stone-900 text-stone-200 p-3 rounded-xl font-mono">
                      flutter build apk --release
                    </pre>
                  </div>

                  <div>
                    <span className="font-semibold text-stone-700 block mb-1">
                      Step 3: Output APK location
                    </span>
                    <pre className="bg-stone-900 text-emerald-400 p-3 rounded-xl font-mono">
                      build/app/outputs/flutter-apk/app-release.apk
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-3">
                <h4 className="text-sm font-bold text-stone-900">Testing on Real Android Devices</h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  After building, transfer the <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">app-release.apk</code> file to your Android phone via USB cable or Google Drive. Make sure to toggle "Install from Unknown Sources" in Android security settings if prompted.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
