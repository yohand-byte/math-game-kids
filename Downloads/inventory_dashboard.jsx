import React, { useState, useMemo } from 'react';
import { AlertTriangle, TrendingUp, Package, BarChart3, Settings } from 'lucide-react';

// Données complètes depuis le fichier Excel
const DATA = [
  {"ModelCode":"261100A","ModelDesc":"מכנס ג'רזי משובץ","Type":"בנים שבת","Color":"בורדו משובץ","Collection":"חורף 25","TotalSales":291,"OpeningStock":308,"CurrentStock":17,"StockTurnover":0.945,"Profit":0.767,"Model":"261100"},
  {"ModelCode":"261100B","ModelDesc":"מכנס ג'רזי משובץ","Type":"בנים שבת","Color":"OLIVE זית","Collection":"חורף 25","TotalSales":364,"OpeningStock":373,"CurrentStock":9,"StockTurnover":0.976,"Profit":0.767,"Model":"261100"},
  {"ModelCode":"261104A","ModelDesc":"סרפן ג'רזי משובץ","Type":"בנות שבת","Color":"בורדו משובץ","Collection":"חורף 25","TotalSales":319,"OpeningStock":386,"CurrentStock":67,"StockTurnover":0.826,"Profit":0.755,"Model":"261104"},
  {"ModelCode":"261145C","ModelDesc":"קרדיגן בייבי","Type":"תינוקות שבת","Color":"בורדו bordo","Collection":"חורף 25","TotalSales":170,"OpeningStock":219,"CurrentStock":49,"StockTurnover":0.776,"Profit":0.750,"Model":"261145"},
  {"ModelCode":"261145D","ModelDesc":"קרדיגן בייבי","Type":"תינוקות שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":154,"OpeningStock":213,"CurrentStock":59,"StockTurnover":0.723,"Profit":0.750,"Model":"261145"},
  {"ModelCode":"261146A","ModelDesc":"קרדיגן ילדות+נער","Type":"בנות שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":338,"OpeningStock":518,"CurrentStock":180,"StockTurnover":0.653,"Profit":0.751,"Model":"261146"},
  {"ModelCode":"261146B","ModelDesc":"קרדיגן ילדות+נער","Type":"בנות שבת","Color":"בז' beige","Collection":"חורף 25","TotalSales":313,"OpeningStock":457,"CurrentStock":144,"StockTurnover":0.685,"Profit":0.751,"Model":"261146"},
  {"ModelCode":"261146C","ModelDesc":"קרדיגן ילדות+נער","Type":"בנות שבת","Color":"בורדו bordo","Collection":"חורף 25","TotalSales":359,"OpeningStock":394,"CurrentStock":35,"StockTurnover":0.911,"Profit":0.751,"Model":"261146"},
  {"ModelCode":"261146D","ModelDesc":"קרדיגן ילדות+נער","Type":"בנות שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":350,"OpeningStock":405,"CurrentStock":55,"StockTurnover":0.864,"Profit":0.751,"Model":"261146"},
  {"ModelCode":"261175A","ModelDesc":"חצאית טפט כיווצי","Type":"נערות שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":412,"OpeningStock":444,"CurrentStock":32,"StockTurnover":0.928,"Profit":0.746,"Model":"261175"},
  {"ModelCode":"261175B","ModelDesc":"חצאית טפט כיווצי","Type":"נערות שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":275,"OpeningStock":288,"CurrentStock":13,"StockTurnover":0.955,"Profit":0.746,"Model":"261175"},
  {"ModelCode":"261175C","ModelDesc":"חצאית טפט כיווצי","Type":"נערות שבת","Color":"בורדו bordo","Collection":"חורף 25","TotalSales":281,"OpeningStock":289,"CurrentStock":8,"StockTurnover":0.972,"Profit":0.746,"Model":"261175"},
  {"ModelCode":"261168A","ModelDesc":"מכנס שבת שחור קט","Type":"בנים שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":284,"OpeningStock":382,"CurrentStock":98,"StockTurnover":0.743,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261168B","ModelDesc":"מכנס שבת שחור דמ","Type":"בנים שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":201,"OpeningStock":347,"CurrentStock":146,"StockTurnover":0.579,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261168C","ModelDesc":"מכנס שבת ירוק כה","Type":"בנים שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":219,"OpeningStock":341,"CurrentStock":122,"StockTurnover":0.642,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261168D","ModelDesc":"מכנס שבת צמר חום","Type":"בנים שבת","Color":"Brown חום","Collection":"חורף 25","TotalSales":182,"OpeningStock":243,"CurrentStock":61,"StockTurnover":0.749,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261168E","ModelDesc":"מכנס שבת נייבי פ","Type":"בנים שבת","Color":"נייבי navy","Collection":"חורף 25","TotalSales":143,"OpeningStock":238,"CurrentStock":95,"StockTurnover":0.601,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261168F","ModelDesc":"מכנס שבת צמר דק","Type":"בנים שבת","Color":"OLIVE זית","Collection":"חורף 25","TotalSales":257,"OpeningStock":352,"CurrentStock":95,"StockTurnover":0.730,"Profit":0.744,"Model":"261168"},
  {"ModelCode":"261149A","ModelDesc":"סטן מנומר נערות","Type":"נערות שבת","Color":"","Collection":"חורף 25","TotalSales":203,"OpeningStock":645,"CurrentStock":442,"StockTurnover":0.315,"Profit":0.742,"Model":"261149"},
  {"ModelCode":"261149B","ModelDesc":"סטן מנומר נערות","Type":"נערות שבת","Color":"מודפס PRINTED","Collection":"חורף 25","TotalSales":237,"OpeningStock":451,"CurrentStock":214,"StockTurnover":0.525,"Profit":0.742,"Model":"261149"},
  {"ModelCode":"261112A","ModelDesc":"חצאית סאטן","Type":"נערות שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":169,"OpeningStock":247,"CurrentStock":78,"StockTurnover":0.684,"Profit":0.790,"Model":"261112"},
  {"ModelCode":"261112B","ModelDesc":"חצאית סאטן","Type":"נערות שבת","Color":"בורדו bordo","Collection":"חורף 25","TotalSales":162,"OpeningStock":238,"CurrentStock":76,"StockTurnover":0.681,"Profit":0.790,"Model":"261112"},
  {"ModelCode":"261112C","ModelDesc":"חצאית סאטן","Type":"נערות שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":210,"OpeningStock":249,"CurrentStock":39,"StockTurnover":0.843,"Profit":0.790,"Model":"261112"},
  {"ModelCode":"261112D","ModelDesc":"חצאית סאטן","Type":"נערות שבת","Color":"פרחוני FLORAL","Collection":"חורף 25","TotalSales":181,"OpeningStock":246,"CurrentStock":65,"StockTurnover":0.736,"Profit":0.790,"Model":"261112"},
  {"ModelCode":"261177A","ModelDesc":"חצאית קפלים עור","Type":"בנות שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":199,"OpeningStock":452,"CurrentStock":253,"StockTurnover":0.440,"Profit":0.745,"Model":"261177"},
  {"ModelCode":"261177B","ModelDesc":"חצאית קפלים עור","Type":"בנות שבת","Color":"ירוק GREEN","Collection":"חורף 25","TotalSales":238,"OpeningStock":459,"CurrentStock":221,"StockTurnover":0.519,"Profit":0.745,"Model":"261177"},
  {"ModelCode":"261177C","ModelDesc":"חצאית קפלים עור","Type":"בנות שבת","Color":"בורדו bordo","Collection":"חורף 25","TotalSales":301,"OpeningStock":470,"CurrentStock":169,"StockTurnover":0.640,"Profit":0.745,"Model":"261177"},
  {"ModelCode":"261177D","ModelDesc":"חצאית קפלים עור","Type":"בנות שבת","Color":"בז' beige","Collection":"חורף 25","TotalSales":139,"OpeningStock":469,"CurrentStock":330,"StockTurnover":0.296,"Profit":0.745,"Model":"261177"},
  {"ModelCode":"261270A","ModelDesc":"סוויטשרט עם פטצ'","Type":"בנות יום חול","Color":"מוקה mocha","Collection":"חורף 25","TotalSales":248,"OpeningStock":535,"CurrentStock":287,"StockTurnover":0.464,"Profit":0.750,"Model":"261270"},
  {"ModelCode":"261270B","ModelDesc":"סוויטשרט עם פטצ'","Type":"בנות יום חול","Color":"שחור black","Collection":"חורף 25","TotalSales":192,"OpeningStock":535,"CurrentStock":343,"StockTurnover":0.359,"Profit":0.750,"Model":"261270"},
  {"ModelCode":"261124B","ModelDesc":"שמלת טול קומות","Type":"בנות שבת","Color":"פרחוני FLORAL","Collection":"חורף 25","TotalSales":343,"OpeningStock":513,"CurrentStock":170,"StockTurnover":0.669,"Profit":0.711,"Model":"261124"},
  {"ModelCode":"261124A","ModelDesc":"שמלת טול קומות","Type":"בנות שבת","Color":"שחור black","Collection":"חורף 25","TotalSales":111,"OpeningStock":494,"CurrentStock":383,"StockTurnover":0.225,"Profit":0.716,"Model":"261124"},
];

export default function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [lowStockThreshold, setLowStockThreshold] = useState(50);
  const [reorderRules, setReorderRules] = useState({});
  const [selectedModel, setSelectedModel] = useState(null);

  // Analyses intelligentes
  const topSellers = useMemo(() => {
    return [...DATA].sort((a, b) => b.TotalSales - a.TotalSales).slice(0, 10);
  }, []);

  const lowStockItems = useMemo(() => {
    return DATA.filter(item => item.CurrentStock <= lowStockThreshold)
      .sort((a, b) => a.CurrentStock - b.CurrentStock);
  }, [lowStockThreshold]);

  const modelAnalysis = useMemo(() => {
    const grouped = {};
    DATA.forEach(item => {
      if (!grouped[item.Model]) {
        grouped[item.Model] = [];
      }
      grouped[item.Model].push(item);
    });

    return Object.entries(grouped).map(([model, items]) => {
      const totalSales = items.reduce((sum, item) => sum + item.TotalSales, 0);
      const topColor = items.reduce((prev, current) => 
        (prev.TotalSales > current.TotalSales) ? prev : current
      );
      return {
        model,
        name: items[0].ModelDesc,
        colors: items,
        totalSales,
        topColor: topColor.Color,
        topColorSales: topColor.TotalSales,
      };
    }).sort((a, b) => b.totalSales - a.totalSales);
  }, []);

  const profitAnalysis = useMemo(() => {
    return [...DATA].sort((a, b) => (b.Profit * b.TotalSales) - (a.Profit * a.TotalSales))
      .slice(0, 8)
      .map(item => ({
        ...item,
        totalProfit: item.Profit * item.TotalSales
      }));
  }, []);

  const filteredData = useMemo(() => {
    return DATA.filter(item => 
      item.ModelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ModelDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Color.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleSetReorderRule = (modelCode, threshold) => {
    setReorderRules(prev => ({
      ...prev,
      [modelCode]: threshold
    }));
  };

  const getReorderStatus = (item) => {
    const rule = reorderRules[item.ModelCode];
    if (!rule) return null;
    return item.CurrentStock <= rule;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">📦 Tableau de Bord Inventaire</h1>
          <p className="text-slate-600">Gestion intelligente du stock hiver 25</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {[
            { id: 'overview', label: 'Vue d\'ensemble', icon: '📊' },
            { id: 'top-sellers', label: 'Meilleures ventes', icon: '🔝' },
            { id: 'low-stock', label: 'Stock faible ⚠️', icon: '🚨' },
            { id: 'models', label: 'Analyse par modèle', icon: '👕' },
            { id: 'profit', label: 'Rentabilité', icon: '💰' },
            { id: 'all-items', label: 'Tous les articles', icon: '📝' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 shadow'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Total Articles</p>
                  <p className="text-3xl font-bold text-slate-800">{DATA.length}</p>
                </div>
                <Package className="w-12 h-12 text-blue-400" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Ventes Totales</p>
                  <p className="text-3xl font-bold text-green-600">{DATA.reduce((sum, item) => sum + item.TotalSales, 0)}</p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-400" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Stock Critique</p>
                  <p className="text-3xl font-bold text-red-600">{lowStockItems.length}</p>
                </div>
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm">Stock Moyen</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(DATA.reduce((sum, item) => sum + item.CurrentStock, 0) / DATA.length)}
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-purple-400" />
              </div>
            </div>
          </div>
        )}

        {/* Top Sellers Tab */}
        {activeTab === 'top-sellers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">🏆 Top 10 Meilleures Ventes</h3>
              <div className="space-y-3">
                {topSellers.map((item, idx) => (
                  <div key={item.ModelCode} className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-white rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 w-8">{idx + 1}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800">{item.ModelDesc}</p>
                      <p className="text-sm text-slate-600">{item.Color}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{item.TotalSales}</p>
                      <p className="text-xs text-slate-500">unités</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">📈 Tendances de Stock</h3>
              <div className="space-y-4">
                {topSellers.map(item => (
                  <div key={item.ModelCode}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">{item.ModelCode}</span>
                      <span className="text-sm text-slate-600">{Math.round(item.StockTurnover * 100)}% rotation</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full" 
                        style={{ width: `${Math.min(item.StockTurnover * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Low Stock Tab */}
        {activeTab === 'low-stock' && (
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Articles en Stock Faible</h3>
                  <p className="text-sm text-slate-600">Seuil actuel: {lowStockThreshold} unités</p>
                </div>
                <input 
                  type="number" 
                  value={lowStockThreshold} 
                  onChange={(e) => setLowStockThreshold(Number(e.target.value))}
                  className="ml-auto px-3 py-1 border border-slate-300 rounded"
                  min="0"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-red-50">
                    <tr>
                      <th className="text-left p-3">Code</th>
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3">Couleur</th>
                      <th className="text-center p-3">Stock</th>
                      <th className="text-center p-3">Ventes</th>
                      <th className="text-center p-3">Urgence</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map(item => (
                      <tr key={item.ModelCode} className="border-b hover:bg-red-50 transition">
                        <td className="p-3 font-mono font-bold text-slate-800">{item.ModelCode}</td>
                        <td className="p-3 text-slate-700">{item.ModelDesc}</td>
                        <td className="p-3 text-slate-600">{item.Color}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded font-bold">{item.CurrentStock}</span>
                        </td>
                        <td className="p-3 text-center text-slate-700">{item.TotalSales}</td>
                        <td className="p-3 text-center">
                          {item.CurrentStock < 20 && <span className="text-red-600 font-bold text-lg">🔴</span>}
                          {item.CurrentStock >= 20 && item.CurrentStock <= lowStockThreshold && <span className="text-orange-600 font-bold text-lg">🟠</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Models Analysis Tab */}
        {activeTab === 'models' && (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Analyse par Modèle - Couleurs les Plus Vendues</h3>
            {modelAnalysis.map(model => (
              <div key={model.model} className="bg-white rounded-lg shadow-md p-6">
                <button
                  onClick={() => setSelectedModel(selectedModel === model.model ? null : model.model)}
                  className="w-full text-left"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-lg font-bold text-slate-800">{model.name}</p>
                      <p className="text-sm text-slate-600">{model.model}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{model.totalSales}</p>
                      <p className="text-xs text-slate-500">ventes totales</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-700 mb-2">Couleur #1 (Top Seller)</p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="font-semibold text-slate-800">{model.topColor}</p>
                      <p className="text-sm text-blue-600">{model.topColorSales} ventes</p>
                    </div>
                  </div>
                </button>

                {selectedModel === model.model && (
                  <div className="mt-4 border-t pt-4">
                    <p className="font-semibold text-slate-700 mb-3">Toutes les couleurs disponibles:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {model.colors.map(color => (
                        <div key={color.ModelCode} className="bg-slate-50 p-3 rounded border border-slate-200">
                          <p className="font-medium text-slate-800">{color.Color}</p>
                          <div className="flex justify-between text-sm mt-2">
                            <span className="text-slate-600">Ventes: <span className="font-semibold text-green-600">{color.TotalSales}</span></span>
                            <span className="text-slate-600">Stock: <span className="font-semibold">{color.CurrentStock}</span></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Profit Analysis Tab */}
        {activeTab === 'profit' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">💰 Articles Les Plus Rentables</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-green-50">
                  <tr>
                    <th className="text-left p-3">Code</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-center p-3">Marge %</th>
                    <th className="text-center p-3">Ventes</th>
                    <th className="text-center p-3">Profit Total</th>
                  </tr>
                </thead>
                <tbody>
                  {profitAnalysis.map((item, idx) => (
                    <tr key={item.ModelCode} className="border-b hover:bg-green-50 transition">
                      <td className="p-3 font-mono font-bold">{item.ModelCode}</td>
                      <td className="p-3">{item.ModelDesc}</td>
                      <td className="p-3 text-center">{Math.round(item.Profit * 100)}%</td>
                      <td className="p-3 text-center font-semibold">{item.TotalSales}</td>
                      <td className="p-3 text-center font-bold text-green-600">{Math.round(item.totalProfit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* All Items Tab */}
        {activeTab === 'all-items' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="🔍 Rechercher par code, description ou couleur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="text-left p-3">Code</th>
                    <th className="text-left p-3">Description</th>
                    <th className="text-left p-3">Couleur</th>
                    <th className="text-center p-3">Ventes</th>
                    <th className="text-center p-3">Stock</th>
                    <th className="text-center p-3">Rotation %</th>
                    <th className="text-center p-3">Marge %</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map(item => (
                    <tr key={item.ModelCode} className="border-b hover:bg-slate-50 transition">
                      <td className="p-3 font-mono font-bold text-slate-800">{item.ModelCode}</td>
                      <td className="p-3 text-slate-700">{item.ModelDesc}</td>
                      <td className="p-3 text-slate-600">{item.Color}</td>
                      <td className="p-3 text-center font-semibold">{item.TotalSales}</td>
                      <td className="p-3 text-center">
                        <span className={item.CurrentStock < 30 ? 'text-red-600 font-bold' : 'text-slate-700'}>
                          {item.CurrentStock}
                        </span>
                      </td>
                      <td className="p-3 text-center">{Math.round(item.StockTurnover * 100)}%</td>
                      <td className="p-3 text-center text-green-600 font-semibold">{Math.round(item.Profit * 100)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-slate-600 mt-4">{filteredData.length} articles affichés</p>
          </div>
        )}
      </div>
    </div>
  );
}
