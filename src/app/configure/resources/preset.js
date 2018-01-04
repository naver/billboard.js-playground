module.exports = {
	regions: {
		attributes: {
			customkeys: [{
				name: "axis",
				type: "string"
			}, {
				name: "start",
				type: "number"
			}, {
				name: "end",
				type: "number"
			}, {
				name: "class",
				type: "string"
			}]
		}
	},
	size: {
		properties: {
			width: {
				attributes: {
					min: 0,
					max: 1000,
					step: 1
				}
			},
			height: {
				attributes: {
					min: 0,
					max: 1000,
					step: 1
				}
			}
		}
	},
	padding: {
		properties: {
			top: {
				attributes: {
					min: -1000,
					max: 1000,
					step: 1
				}
			},
			right: {
				attributes: {
					min: -1000,
					max: 1000,
					step: 1
				}
			},
			bottom: {
				attributes: {
					min: -1000,
					max: 1000,
					step: 1
				}
			},
			left: {
				attributes: {
					min: -1000,
					max: 1000,
					step: 1
				}
			}
		}
	},
	transition: {
		properties: {
			duration: {
				attributes: {
					min: 0,
					max: 1000,
					step: 1
				}
			}
		}
	},
	data: {
		properties: {
			columns: {
				attributes: {
					hidegui: true
				}
			},
			rows: {
				attributes: {
					hidegui: true
				}
			},
			json: {
				attributes: {
					hidegui: true
				}
			},
			url: {
				attributes: {
					hidegui: true
				}
			},
			type: {
				attributes: {
					valueoptions: ["line", "spline", "step", "area", "area-spline", "area-step", "bar", "bubble", "scatter", "pie", "donut", "gauge"]
				}
			}
		}
	},
	axis: {
		properties: {
			y: {
				properties: {
					tick: {
						properties: {
							count: {
								attributes: {
									min: -500,
									max: 500,
									step: 1
								}
							}
						}
					},
					center: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					},
					max: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					},
					min: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					}
				}
			},
			y2: {
				properties: {
					tick: {
						properties: {
							count: {
								attributes: {
									min: -500,
									max: 500,
									step: 1
								}
							}
						}
					},
					center: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					},
					max: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					},
					min: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					}
				}
			},
			x: {
				properties: {
					height: {
						attributes: {
							min: 0,
							max: 500,
							step: 1
						}
					},
					tick: {
						properties: {
							width: {
								attributes: {
									min: 0,
									max: 100,
									step: 1
								}
							},
							rotate: {
								attributes: {
									min: -100,
									max: 100,
									step: 1
								}
							},
							count: {
								attributes: {
									min: 0,
									max: 100,
									step: 1
								}
							},
							culling: {
								properties: {
									max: {
										attributes: {
											min: 0,
											max: 100,
											step: 1
										}
									}
								}
							}
						}
					},
					type: {
						attributes: {
							valueoptions: ["timeseries", "category", "indexed"]
						}
					},
					max: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					},
					min: {
						attributes: {
							min: -500,
							max: 500,
							step: 1
						}
					}
				}
			}
		}
	},
	bubble: {
		properties: {
			maxR: {
				attributes: {
					min: 0,
					max: 100,
					step: 1
				}
			}
		}
	},
	point: {
		properties: {
			select: {
				properties: {
					r: {
						attributes: {
							custominput: true
						}
					}
				}
			},
			focus: {
				properties: {
					expand: {
						properties: {
							r: {
								attributes: {
									custominput: true
								}
							}
						}
					}
				}
			},
			r: {
				attributes: {
					min: 0,
					max: 50,
					step: 0.1
				}
			}
		}
	},
	gauge: {
		properties: {
			startingAngle: {
				attributes: {
					custominput: true
				}
			},
			max: {
				attributes: {
					min: 0,
					max: 1000,
					step: 1
				}
			},
			expand: {
				properties: {
					duration: {
						attributes: {
							min: 0,
							max: 100,
							step: 1
						}
					}
				}
			}
		}
	},
	legend: {
		properties: {
			inset: {
				properties: {
					anchor: {
						attributes: {
							name: "legend.inset.anchor",
							valueoptions: ["top-left", "top-right", "bottom-left", "bottom-right"],
							type: {
								names: ["String"]
							},
							optional: true,
							value: "top-left",
							defaultvalue: "top-left"
						}
					},
					x: {
						attributes: {
							name: "legend.inset.x",
							type: {
								names: ["Number"]
							},
							optional: true,
							value: 10,
							defaultvalue: 10,
							min: 0,
							max: 100,
							step: 1
						}
					},
					y: {
						attributes: {
							name: "legend.inset.y",
							type: {
								names: ["Number"]
							},
							optional: true,
							value: 0,
							defaultvalue: 0,
							min: 0,
							max: 100,
							step: 1
						}
					},
					step: {
						attributes: {
							name: "legend.inset.step",
							type: {
								names: ["Number"]
							},
							optional: true,
							value: "undefined",
							defaultvalue: "undefined",
							min: 0,
							max: 100,
							step: 1
						}
					}
				}
			},
			position: {
				attributes: {
					valueoptions: ["bottom", "right", "inset"]
				}
			}
		}
	},

	grid: {
		properties: {
			y: {
				properties: {
					ticks: {
						attributes: {
							min: 0,
							max: 100,
							step: 1
						}
					}
				}
			}
		}
	},
	color: {
		properties: {
			threshold: {
				properties: {
					max: {
						attributes: {
							min: 0,
							max: 300,
							step: 1
						}
					}
				}
			}
		}
	},
	title: {
		properties: {
			position: {
				attributes: {
					valueoptions: ["top-center", "top-right", "top-left"]
				}
			}
		}
	}
};
