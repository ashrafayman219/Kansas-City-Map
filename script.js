// display variables
var displayMap;
let view;
let Waldo;
let Downtown;
let MidtownPlaza;
let Brookside;
let KCMO_Neighborhoods;
let District1_Neighborhoods;
let District1_Merged;
let District2_Neighborhoods;
let District2_Merged;
let District3_Merged;
let District3_Neighborhoods;
let District4_Neighborhoods;
let District4_Merged;
let District5_Merged;
let District5_Neighborhoods;
let District6_Neighborhoods;
let District6_Merged;

function loadModule(moduleName) {
  return new Promise((resolve, reject) => {
    require([moduleName], (module) => {
      if (module) {
        resolve(module);
      } else {
        reject(new Error(`Module not found: ${moduleName}`));
      }
    }, (error) => {
      reject(error);
    });
  });
}

async function initializeMapKansasCity() {
  try {
    const [esriConfig, Map, MapView, FeatureLayer, Legend, GeoJSONLayer, ImageElement, MediaLayer, ExtentAndRotationGeoreference, Extent] =
      await Promise.all([
        loadModule("esri/config"),
        loadModule("esri/Map"),
        loadModule("esri/views/MapView"),
        loadModule("esri/layers/FeatureLayer"),
        loadModule("esri/widgets/Legend"),
        loadModule("esri/layers/GeoJSONLayer"),
        loadModule("esri/layers/support/ImageElement"),
        loadModule("esri/layers/MediaLayer"),
        loadModule("esri/layers/support/ExtentAndRotationGeoreference"),
        loadModule("esri/geometry/Extent"),
      ]);

    esriConfig.apiKey =
      "AAPKe96926c67dfd4afb80185e0a1020deafnvFzsj9yYBaj80DS9MWNWPGhkV_K-kXKNIkOzspRqvQ4fQkbcRrhPVfkFafbB1zt"; // Will change it

    const region6 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#7f89a1",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region5 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#99977F",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region4 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#fffcd4",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region3 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#b1cdc2",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region2 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#38627a",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const region1 = {
      type: "simple-fill", // autocasts as new SimpleFillSymbol()
      color: "#0d2644",
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.5],
      },
    };

    const renderer = {
      type: "unique-value", // autocasts as new ClassBreaksRenderer()
      field: "region",
      // normalizationField: "EDUCBASECY",
      legendOptions: {
        title: "by regions in Kansas City",
      },
      defaultSymbol: {
        type: "simple-fill", // autocasts as new SimpleFillSymbol()
        color: "black",
        style: "backward-diagonal",
        outline: {
          width: 0.5,
          color: [50, 50, 50, 0.6],
        },
      },
      defaultLabel: "no data",
      uniqueValueInfos: [
        {
          value: "REGION 1",
          symbol: region1,
          label: "Region 1",
        },
        {
          value: "REGION 2",
          symbol: region2,
          label: "Region 2",
        },
        {
          value: "REGION 3",
          symbol: region3,
          label: "Region 3",
        },
        {
          value: "REGION 4",
          symbol: region4,
          label: "Region 4",
        },
        {
          value: "REGION 5",
          symbol: region5,
          label: "Region 5",
        },
        {
          value: "REGION 6",
          symbol: region6,
          label: "Region 6",
        },
      ],
    };

    const KansasCityBoundaries = new FeatureLayer({
      // URL to the service
      url: "https://services3.arcgis.com/VOmdmHdlm9oTPX9a/ArcGIS/rest/services/KCMO_City_Limits/FeatureServer/0",
      spatialReference: { wkid: 4326 },
      title: "Kansas City Boundaries",
      popupTemplate: {
        title: "{Kansas City Limits}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "OBJECTID",
                label: "OBJECTID",
              },
              // {
              //   fieldName: "Shape__Area",
              //   label: "Area",
              // },
              // {
              //   fieldName: "Shape__Length",
              //   label: "Perimeter",
              // },
            ],
          },
        ],
      },
    });

    $.getJSON("./KCMO_Neighborhoods.geojson", function (data) {
      KCMO_Neighborhoods = new GeoJSONLayer({
        url: "./KCMO_Neighborhoods.geojson",
        renderer: renderer,
        title: "KCMO Neighborhoods",
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "OBJECTID",
                },
                {
                  fieldName: "region",
                  label: "REGION",
                },
                {
                  fieldName: "NBHNAME",
                  label: "NBH NAME",
                },
                // {
                //   fieldName: "SHAPE_AREA",
                //   label: "Area",
                // },
                // {
                //   fieldName: "SHAPE_LEN",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(KCMO_Neighborhoods);
    });
    // const KCMO_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/KCMO_Neighborhoods/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   renderer: renderer,
    //   title: "KCMO Neighborhoods",
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "OBJECTID",
    //             label: "OBJECTID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "REGION",
    //           },
    //           {
    //             fieldName: "NBHNAME",
    //             label: "NBH NAME",
    //           },
    //           // {
    //           //   fieldName: "SHAPE_AREA",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "SHAPE_LEN",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District1_Neighborhood_New.geojson", function (data) {
      District1_Neighborhoods = new GeoJSONLayer({
        url: "./District1_Neighborhood_New.geojson",
        title: "District1 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region1,
          // {
          //   type: "simple-fill",
          //   color: [179, 115, 99, 0.5],
          //   // outline: {
          //   //     width: 0.7,
          //   //     color: "#B30505"
          //   // }
          // },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District1_Neighborhoods);
      District1_Neighborhoods.visible = false;
    });
    // const District1_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District1_Neighborhood_New/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District1 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region1,
    //     // {
    //     //   type: "simple-fill",
    //     //   color: [179, 115, 99, 0.5],
    //     //   // outline: {
    //     //   //     width: 0.7,
    //     //   //     color: "#B30505"
    //     //   // }
    //     // },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District2_Neighborhoods.geojson", function (data) {
      District2_Neighborhoods = new GeoJSONLayer({
        url: "./District2_Neighborhoods.geojson",
        title: "District2 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region2,
          // {
          //   type: "simple-fill",
          //   color: [179, 66, 99, 0.5],
          //   // outline: {
          //   //     width: 0.7,
          //   //     color: "#B30505"
          //   // }
          // },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District2_Neighborhoods);
      District2_Neighborhoods.visible = false;
    });
    // const District2_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District2_Neighborhoods/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District2 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region2,
    //     // {
    //     //   type: "simple-fill",
    //     //   color: [179, 66, 99, 0.5],
    //     //   // outline: {
    //     //   //     width: 0.7,
    //     //   //     color: "#B30505"
    //     //   // }
    //     // },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District3_Neighborhood.geojson", function (data) {
      District3_Neighborhoods = new GeoJSONLayer({
        url: "./District3_Neighborhood.geojson",
        title: "District3 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region3,
          // {
          //   type: "simple-fill",
          //   color: [110, 25, 240, 0.5],
          //   // outline: {
          //   //     width: 0.7,
          //   //     color: "#B30505"
          //   // }
          // },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District3_Neighborhoods);
      District3_Neighborhoods.visible = false;
    });
    // const District3_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District3_Neighborhood/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District3 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region3,
    //     // {
    //     //   type: "simple-fill",
    //     //   color: [110, 25, 240, 0.5],
    //     //   // outline: {
    //     //   //     width: 0.7,
    //     //   //     color: "#B30505"
    //     //   // }
    //     // },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District4_Neighborhood.geojson", function (data) {
      District4_Neighborhoods = new GeoJSONLayer({
        url: "./District4_Neighborhood.geojson",
        title: "District4 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region4,
          // {
          //   type: "simple-fill",
          //   color: [150, 166, 199, 0.5],
          //   // outline: {
          //   //     width: 0.7,
          //   //     color: "#B30505"
          //   // }
          // },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District4_Neighborhoods);
      District4_Neighborhoods.visible = false;
    });
    // const District4_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District4_Neighborhood/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District4 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region4,
    //     // {
    //     //   type: "simple-fill",
    //     //   color: [150, 166, 199, 0.5],
    //     //   // outline: {
    //     //   //     width: 0.7,
    //     //   //     color: "#B30505"
    //     //   // }
    //     // },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District5_Neighborhood.geojson", function (data) {
      District5_Neighborhoods = new GeoJSONLayer({
        url: "./District5_Neighborhood.geojson",
        title: "District5 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region5,
          // {
          //   type: "simple-fill",
          //   color: [244, 166, 33, 0.5],
          //   // outline: {
          //   //     width: 0.7,
          //   //     color: "#B30505"
          //   // }
          // },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District5_Neighborhoods);
      District5_Neighborhoods.visible = false;
    });
    // const District5_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District5_Neighborhood/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District5 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region5,
    //     // {
    //     //   type: "simple-fill",
    //     //   color: [244, 166, 33, 0.5],
    //     //   // outline: {
    //     //   //     width: 0.7,
    //     //   //     color: "#B30505"
    //     //   // }
    //     // },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District6_Neighborhood.geojson", function (data) {
      District6_Neighborhoods = new GeoJSONLayer({
        url: "./District6_Neighborhood.geojson",
        title: "District6 Neighborhoods",
        renderer: {
          type: "simple",
          symbol: region6,
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District6_Neighborhoods);
      District6_Neighborhoods.visible = false;
    });

    // const District6_Neighborhoods = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District6_Neighborhood/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District6 Neighborhoods",
    //   renderer: {
    //     type: "simple",
    //     symbol: region6,
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    // merged
    $.getJSON("./District1_Neighborhood_Merge.geojson", function (data) {
      District1_Merged = new GeoJSONLayer({
        url: "./District1_Neighborhood_Merge.geojson",
        title: "District1 Merged",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [179, 115, 99, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District1_Merged);
      District1_Merged.visible = false;
    });
    // const District1_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District1_Neighborhood_Merge/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District1 Merged",
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [179, 115, 99, 0.5],
    //       // outline: {
    //       //     width: 0.7,
    //       //     color: "#B30505"
    //       // }
    //     },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District2_Neighborhoods_Merged.geojson", function (data) {
      District2_Merged = new GeoJSONLayer({
        url: "./District2_Neighborhoods_Merged.geojson",
        title: "District2 Merged",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [179, 66, 99, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District2_Merged);
      District2_Merged.visible = false;
    });
    // const District2_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District2_Neighborhoods_Merged/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District2 Merged",
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [179, 66, 99, 0.5],
    //       // outline: {
    //       //     width: 0.7,
    //       //     color: "#B30505"
    //       // }
    //     },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District3_Neighborhood_Merge.geojson", function (data) {
      District3_Merged = new GeoJSONLayer({
        url: "./District3_Neighborhood_Merge.geojson",
        title: "District3 Merged",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [110, 25, 240, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District3_Merged);
      District3_Merged.visible = false;
    });
    // const District3_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District3_Neighborhood_Merge/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District3 Merged",
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [110, 25, 240, 0.5],
    //       // outline: {
    //       //     width: 0.7,
    //       //     color: "#B30505"
    //       // }
    //     },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District4_Neighborhood_Merge.geojson", function (data) {
      District4_Merged = new GeoJSONLayer({
        url: "./District4_Neighborhood_Merge.geojson",
        title: "District4 Merged",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [150, 166, 199, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District4_Merged);
      District4_Merged.visible = false;
    });
    // const District4_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District4_Neighborhood_Merge/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District4 Merged",
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [150, 166, 199, 0.5],
    //       // outline: {
    //       //     width: 0.7,
    //       //     color: "#B30505"
    //       // }
    //     },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District5_Neighborhood_Merge.geojson", function (data) {
      District5_Merged = new GeoJSONLayer({
        url: "./District5_Neighborhood_Merge.geojson",
        title: "District5 Merged",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [244, 166, 33, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District5_Merged);
      District5_Merged.visible = false;
    });
    // const District5_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District5_Neighborhood_Merge/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District5 Merged",
    //   renderer: {
    //     type: "simple",
    //     symbol: {
    //       type: "simple-fill",
    //       color: [244, 166, 33, 0.5],
    //       // outline: {
    //       //     width: 0.7,
    //       //     color: "#B30505"
    //       // }
    //     },
    //   },
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./District5_Neighborhood_Merge.geojson", function (data) {
      District6_Merged = new GeoJSONLayer({
        url: "./District5_Neighborhood_Merge.geojson",
        title: "District6 Merged",
        popupTemplate: {
          title: "{region}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "FID",
                  label: "FID",
                },
                {
                  fieldName: "region",
                  label: "Region",
                },
                // {
                //   fieldName: "Shape__Area",
                //   label: "Area",
                // },
                // {
                //   fieldName: "Shape__Length",
                //   label: "Perimeter",
                // },
              ],
            },
          ],
        },
      });
      displayMap.add(District6_Merged);
      District6_Merged.visible = false;
    });
    // const District6_Merged = new FeatureLayer({
    //   // URL to the service
    //   url: "https://services2.arcgis.com/zpMeZp1HZHTJ22NL/arcgis/rest/services/District6_Neighborhood_Merge/FeatureServer/0",
    //   spatialReference: { wkid: 4326 },
    //   title: "District6 Merged",
    //   popupTemplate: {
    //     title: "{region}",
    //     content: [
    //       {
    //         type: "fields",
    //         fieldInfos: [
    //           {
    //             fieldName: "FID",
    //             label: "FID",
    //           },
    //           {
    //             fieldName: "region",
    //             label: "Region",
    //           },
    //           // {
    //           //   fieldName: "Shape__Area",
    //           //   label: "Area",
    //           // },
    //           // {
    //           //   fieldName: "Shape__Length",
    //           //   label: "Perimeter",
    //           // },
    //         ],
    //       },
    //     ],
    //   },
    // });

    $.getJSON("./Waldo.geojson", function (data) {
      Waldo = new GeoJSONLayer({
        url: "./Waldo.geojson",
        title: "Waldo",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [244, 166, 33, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{Name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "ID",
                },
                {
                  fieldName: "Name",
                  label: "Zone",
                },
              ],
            },
          ],
        },
      });
      displayMap.add(Waldo);
    });

    $.getJSON("./Brookside.geojson", function (data) {
      Brookside = new GeoJSONLayer({
        url: "./Brookside.geojson",
        title: "Brookside",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [211, 167, 33, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{Name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "ID",
                },
                {
                  fieldName: "Name",
                  label: "Zone",
                },
              ],
            },
          ],
        },
      });
      displayMap.add(Brookside);
    });

    $.getJSON("./Downtown.geojson", function (data) {
      Downtown = new GeoJSONLayer({
        url: "./Downtown.geojson",
        title: "Downtown",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [244, 90, 33, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{Name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "ID",
                },
                {
                  fieldName: "Name",
                  label: "Zone",
                },
              ],
            },
          ],
        },
      });
      displayMap.add(Downtown);
    });

    $.getJSON("./Midtown_Plaza.geojson", function (data) {
      MidtownPlaza = new GeoJSONLayer({
        url: "./Midtown_Plaza.geojson",
        title: "Midtown Plaza",
        renderer: {
          type: "simple",
          symbol: {
            type: "simple-fill",
            color: [244, 166, 160, 0.5],
            // outline: {
            //     width: 0.7,
            //     color: "#B30505"
            // }
          },
        },
        popupTemplate: {
          title: "{Name}",
          content: [
            {
              type: "fields",
              fieldInfos: [
                {
                  fieldName: "OBJECTID",
                  label: "ID",
                },
                {
                  fieldName: "Name",
                  label: "Zone",
                },
              ],
            },
          ],
        },
      });

      displayMap.add(MidtownPlaza);
    });

    // // Load the GeoJSON file using AJAX
    // $.getJSON('path/to/your/geojson/file.geojson', function(data) {
    //   // Create new geojson layer using the parsed GeoJSON data
    //   const layer = new GeoJSONLayer({
    //       // Assign the parsed GeoJSON data
    //       // This assumes that the GeoJSON data is in the correct format and can be directly passed to the GeoJSONLayer
    //       // If needed, you may need to adjust the data structure according to your GeoJSON file
    //       // You can also specify additional options for styling and rendering the layer
    //       // Refer to the ArcGIS API documentation for more details on available options
    //       // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-GeoJSONLayer.html
    //       // For example, you can set a renderer for the layer to define how features are visualized on the map
    //       // renderer: {...},
    //       // You can also set popupTemplate to define the content of the popup that appears when clicking on a feature
    //       // popupTemplate: {...}
    //       // Specify the URL for the GeoJSON file as the source
    //       // Alternatively, you can directly pass the GeoJSON data without using URL.createObjectURL if you already have it loaded
    //       // data: data
    //       url: 'path/to/your/geojson/file.geojson'
    //   });

    //   // Add the layer to the map
    //   // map.add(layer);
    // });

    KansasCityBoundaries.visible = false;
    // // KCMO_Neighborhoods.visible = false;



    // const imageElement = new ImageElement({
    //   type: "image",
    //   image: "https://arcgis.github.io/arcgis-samples-javascript/sample-data/media-layer/neworleans1891.png",
    //   georeference: new ExtentAndRotationGeoreference({
    //     extent: new Extent({
    //       spatialReference: {
    //         wkid: 102100
    //       },
    //       xmin: 103.242601,
    //       ymin: 848.510929,
    //       xmax: 60.226318,
    //       ymax: 586.500539
    //     })
    //   })
    // });







    displayMap = new Map({
      basemap: "satellite",
      layers: [
        // District6_Merged,
        // District5_Merged,
        // District4_Merged,
        // District3_Merged,
        // District2_Merged,
        // District1_Merged,
        // District6_Neighborhoods,
        // District5_Neighborhoods,
        // District4_Neighborhoods,
        // District3_Neighborhoods,
        // District2_Neighborhoods,
        // District1_Neighborhoods,
        // // KCMO_Neighborhoods,
        KansasCityBoundaries,
        // layer
      ],
    });

    view = new MapView({
      center: [-94.578331, 39.099724], // longitude, latitude, centered on Kansas City
      container: "displayMap",
      map: displayMap,
      zoom: 3,
      highlightOptions: {
        color: "#39ff14",
        haloOpacity: 0.9,
        fillOpacity: 0,
      },
    });

    
    view.on("click", function (event) {
      view.hitTest(event).then(function (response) {
        if (response.results.length) {
          let graphic = response.results.filter(function (result) {
            return (
              result.graphic.layer === KCMO_Neighborhoods ||
              result.graphic.layer === KansasCityBoundaries ||
              result.graphic.layer === District1_Neighborhoods ||
              result.graphic.layer === District2_Neighborhoods ||
              result.graphic.layer === District3_Neighborhoods ||
              result.graphic.layer === District4_Neighborhoods ||
              result.graphic.layer === District5_Neighborhoods ||
              result.graphic.layer === District6_Neighborhoods ||
              result.graphic.layer === District1_Merged ||
              result.graphic.layer === District2_Merged ||
              result.graphic.layer === District3_Merged ||
              result.graphic.layer === District4_Merged ||
              result.graphic.layer === District5_Merged ||
              result.graphic.layer === District6_Merged ||
              result.graphic.layer === Waldo ||
              result.graphic.layer === Brookside ||
              result.graphic.layer === MidtownPlaza ||
              result.graphic.layer === Downtown
            );
          })[0].graphic;
          view.goTo(
            {
              target: graphic,
            },
            {
              duration: 2000,
            }
          );
        }
      });
    });

    await view.when();
    
    let legend = new Legend({
      view: view,
      // layerInfos: [
      //   {
      //     layer: District1_Neighborhoods,
      //     title: "Region 1"
      //   },
      //   {
      //     layer: District2_Neighborhoods,
      //     title: "Region 2"
      //   },
      // ]
    });
    legend.headingLevel = 2;
    legend.style = {
      type: "card",
      layout: "stack",
    };
    legend.basemapLegendVisible = true;
    legend.hideLayersNotInCurrentView = true;
    view.ui.add(legend, "bottom-left");

    view.whenLayerView(KansasCityBoundaries).then(function (layerView) {
      view.goTo(
        {
          target: KansasCityBoundaries.fullExtent,
        },
        {
          duration: 2000,
        }
      );
    });

    //add widgets
    addWidgets()
      .then(([view, displayMap]) => {
        console.log(
          "Widgets Returned From Require Scope",
          view,
          displayMap,
          featureLayer
        );
        // You can work with the view object here
      })
      .catch((error) => {
        // Handle any errors here
      });

    clickToDownloadScreenshot();
    addImages()
    .then(([view, displayMap]) => {

      // You can work with the view object here
    })
    .catch((error) => {
      // Handle any errors here
    });
    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

// calling
initializeMapKansasCity()
  .then(() => {
    console.log("Map Returned From Require Scope", displayMap);
    // You can work with the view object here
  })
  .catch((error) => {
    // Handle any errors here
  });

async function addWidgets() {
  try {
    // await initializeMap();

    const [
      Fullscreen,
      BasemapGallery,
      Expand,
      ScaleBar,
      AreaMeasurement2D,
      Search,
      Home,
      LayerList,
    ] = await Promise.all([
      loadModule("esri/widgets/Fullscreen"),
      loadModule("esri/widgets/BasemapGallery"),
      loadModule("esri/widgets/Expand"),
      loadModule("esri/widgets/ScaleBar"),
      loadModule("esri/widgets/AreaMeasurement2D"),
      loadModule("esri/widgets/Search"),
      loadModule("esri/widgets/Home"),
      loadModule("esri/widgets/LayerList"),
    ]);

    var basemapGallery = new BasemapGallery({
      view: view,
    });

    var Expand22 = new Expand({
      view: view,
      content: basemapGallery,
      expandIcon: "basemap",
      group: "top-right",
      // expanded: false,
      expandTooltip: "Open Basmap Gallery",
      collapseTooltip: "Close",
    });
    view.ui.add([Expand22], { position: "top-right", index: 6 });

    var fullscreen = new Fullscreen({
      view: view,
    });
    view.ui.add(fullscreen, "top-right");

    var scalebar = new ScaleBar({
      view: view,
      unit: "metric",
    });
    view.ui.add(scalebar, "bottom-right");

    var search = new Search({
      //Add Search widget
      view: view,
    });
    view.ui.add(search, { position: "top-left", index: 0 }); //Add to the map

    var homeWidget = new Home({
      view: view,
    });
    view.ui.add(homeWidget, "top-left");

    var layerList = new LayerList({
      view: view,
      listItemCreatedFunction: function (event) {
        var item = event.item;
        // displays the legend for each layer list item
        item.panel = {
          content: "legend",
        };
      },
      showLegend: true,
    });

    layerList.visibilityAppearance = "checkbox";
    var Expand5 = new Expand({
      view: view,
      content: layerList,
      expandIcon: "layers",
      group: "top-right",
      // expanded: false,
      expandTooltip: "Layer List",
      collapseTooltip: "Close",
    });

    view.ui.add([Expand5], { position: "top-left", index: 6 });
    view.ui.add("controlsWidget", "top-right");

    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

async function clickToDownloadScreenshot() {
  try {
    console.log("Hi in Screenshot function...");

    document
      .getElementById("takeScreenshotButton")
      .addEventListener("click", () => {
        view.takeScreenshot().then((screenshot) => {
          console.log(screenshot.dataUrl);
          downloadImage("screenshot.png", screenshot.dataUrl);
        });
      });

    // helper function directly from
    // https://developers.arcgis.com/javascript/latest/sample-code/sandbox/index.html?sample=sceneview-screenshot
    function downloadImage(filename, dataUrl) {
      // the download is handled differently in Microsoft browsers
      // because the download attribute for <a> elements is not supported
      if (!window.navigator.msSaveOrOpenBlob) {
        // in browsers that support the download attribute
        // a link is created and a programmatic click will trigger the download
        const element = document.createElement("a");
        element.setAttribute("href", dataUrl);
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      } else {
        // for MS browsers convert dataUrl to Blob
        const byteString = atob(dataUrl.split(",")[1]);
        const mimeString = dataUrl.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });

        // download file
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
    }

    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}



async function addImages() {
  try {
    // await initializeMap();

    const [
      ImageElement, MediaLayer, ExtentAndRotationGeoreference, Extent, ImageryLayer, ImageryTileLayer, MapImageLayer, TileLayer
    ] = await Promise.all([
      loadModule("esri/layers/support/ImageElement"),
      loadModule("esri/layers/MediaLayer"),
      loadModule("esri/layers/support/ExtentAndRotationGeoreference"),
      loadModule("esri/geometry/Extent"),
      loadModule("esri/layers/ImageryLayer"),
      loadModule("esri/layers/ImageryTileLayer"),
      loadModule("esri/layers/MapImageLayer"),
      loadModule("esri/layers/TileLayer"),
    ]);

    console.log("Here")
    // let hood = new ImageElement({
    //   // type: "image",
    //   image: "https://landsat2.arcgis.com/arcgis/rest/services/Landsat8_Views/ImageServer",
    //   georeference: {
    //     type: "extent-and-rotation",
    //     extent: {
    //       spatialReference: {
    //         wkid: 102100
    //       },
    //       // xmax: -121.36966208089407,
    //       // xmin: -122.36306205080291,
    //       // ymax: 45.6782425759772,
    //       // ymin: 45.06172549406862
    //       xmax: -13510808.980596812,
    //       xmin: -13621393.759401118,
    //       ymax: 5728936.442418248,
    //       ymin: 5631244.141931028
    //     }
    //   }
    // });
    
    // const layer = new MediaLayer({
    //   source: [hood],
    //   // spatialReference: {
    //   //   wkid: 102100
    //   // },
    //   // source: {
    //   //   elements: [rainier, hood, stHelen],
    //   //   spatialReference: {
    //   //     wkid: 102100
    //   //   }
    //   // },
    //   opacity: 0.8,
    //   title: "Brookside",
    //   copyright: "NASA Earth Observatory",
    //   // effect: "drop-shadow(3px, 3px, 4px)",
    //   // blendMode: "darken"
    // });
    // displayMap.add(layer);
    
    // Typical usage
    let layer = new TileLayer({
      // URL to the imagery service
      url: "https://tiles.arcgis.com/tiles/zpMeZp1HZHTJ22NL/arcgis/rest/services/BrooksideImage/MapServer"
    });
    displayMap.add(layer);
    
    await view.when();

    return [view, displayMap]; // You can return the view object
  } catch (error) {
    console.error("Error initializing map:", error);
    throw error; // Rethrow the error to handle it further, if needed
  }
}

