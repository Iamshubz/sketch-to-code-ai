
import { Settings } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ConfigOptionsProps {
  framework: string;
  setFramework: (framework: string) => void;
  cssFramework: string;
  setCssFramework: (cssFramework: string) => void;
  responsiveMode: boolean;
  setResponsiveMode: (responsive: boolean) => void;
  complexity: string;
  setComplexity: (complexity: string) => void;
}

const ConfigOptions = ({
  framework,
  setFramework,
  cssFramework,
  setCssFramework,
  responsiveMode,
  setResponsiveMode,
  complexity,
  setComplexity
}: ConfigOptionsProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center">
          <Settings className="h-4 w-4 mr-2" />
          Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="framework">UI Framework</Label>
          <RadioGroup
            id="framework"
            value={framework}
            onValueChange={setFramework}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="react" id="react" />
              <Label htmlFor="react" className="cursor-pointer">React</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="react-native" id="react-native" disabled />
              <Label htmlFor="react-native" className="text-gray-400 cursor-not-allowed">React Native</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="flutter" id="flutter" disabled />
              <Label htmlFor="flutter" className="text-gray-400 cursor-not-allowed">Flutter</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="css-framework">CSS Framework</Label>
          <Select value={cssFramework} onValueChange={setCssFramework}>
            <SelectTrigger id="css-framework">
              <SelectValue placeholder="Select framework" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tailwind">Tailwind CSS</SelectItem>
              <SelectItem value="bootstrap">Bootstrap (Coming Soon)</SelectItem>
              <SelectItem value="mui">Material UI (Coming Soon)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="complexity">Component Complexity</Label>
          <Select value={complexity} onValueChange={setComplexity}>
            <SelectTrigger id="complexity">
              <SelectValue placeholder="Select complexity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="simple">Simple UI</SelectItem>
              <SelectItem value="medium">Medium complexity</SelectItem>
              <SelectItem value="advanced">Advanced (Beta)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="responsive-mode" className="cursor-pointer">Responsive Design</Label>
          <Switch
            id="responsive-mode"
            checked={responsiveMode}
            onCheckedChange={setResponsiveMode}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigOptions;
